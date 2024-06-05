import RequestHeader from './header'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import { BaseUrl, LoginPath, verifyCodePath } from '../config/index'

export default class Login {
  headerIns: Record<string, any>
  loginData: Record<string, any>

  static instance: Login

  static getInstance(): Login {
    if(!Login.instance) {
      Login.instance = new Login()
    }
    return Login.instance
  }

  constructor() {
    this.headerIns = RequestHeader.getIns()
    this.loginData = {}
  }

  public async getCookie(): Promise<void> {
    const headerRes = await axios({
      methods: 'get',
      url: BaseUrl,
      headers: this.headerIns.getReqCookieHeader()
    })
    // 设置请求头cookie
    this.headerIns.appendHeaderCookie(headerRes.headers['set-cookie'])
  }

  public async getVerifyCode(): Promise<void> {
    return new Promise(async (resolve) => {
      await this.getCookie()
      const captchaUrl = `${BaseUrl}${verifyCodePath}?v=${new Date().getTime()}`
      const captchaPath = path.resolve(__dirname, '../../src/renderer/src/assets/captcha.png')
      console.log("captchaPath", captchaPath)
      const headers = this.headerIns.getRequestHeader()

      const res = await axios.request({
        url: captchaUrl,
        method: 'get',
        responseType: 'stream',
        headers
      })
      // 保存图片到本地
      const writer = fs.createWriteStream(captchaPath)
      res.data.pipe(writer)
      let error = null as unknown
      writer.on('error', (err) => {
        console.log("err", err)
        error = err
        writer.close()
      })
      writer.on('close', async () => {
        console.log("close")
        if (!error) {
          this.headerIns.appendHeaderCookie(res.headers['set-cookie'])
          resolve()
        }
      })
    })
  }

  public async login(verifyCode: string): Promise<void> {
    if(!verifyCode) {
        console.error('必须输入验证码')
        return
    }

    const headers = this.headerIns.getRequestHeader()

    const params = {
      username: 'YTYT1122',
      host: '192.168.3.53',
      action: 'loginMobile',
      secret: 'DZ',
      type: '0',
      random: verifyCode,
      lang: 'zh_CN',
      password: 'A2F590D1509F20F010C5A4597DB2E670',
      agent: 'RMB1',
      clientType: '1',
      phoneType: 'Apple iPhone'
    }

    // console.log("登录头", headers)
    // console.log("登录参数", params)

    const url = `${BaseUrl}${LoginPath}`

    try {
      const res = await axios({
        methods: 'get',
        url,
        headers,
        params
      })
      const data = res.data.value
      const loginMessage = JSON.parse(data)
      if (loginMessage) {
        console.log("登录信息", loginMessage)
        this.loginData = loginMessage
      }
    } catch (e) {
      console.error('Error:', e)
    }
  }

  public getLoginData(): typeof this.loginData {
    return this.loginData
  }
}
