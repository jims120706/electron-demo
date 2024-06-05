import { useState, useEffect } from 'react'
import axios from 'axios'
import verifyCodeImg from '@renderer/assets/captcha.png'

function Login(): JSX.Element {
  const [hasVerifyCode, setVerifyCode] = useState('')
  const [verifyCodeNumber, setVerifyCodeNumber] = useState('')

  useEffect(() => {
    getCodeUrl()
  })

  function getCodeUrl(): void {
    import('@renderer/assets/captcha.png').then((url) => {
      setVerifyCode(true)
    })
  }

  function refreshCode(): void {
    window.electron.ipcRenderer.send('refresh-verify-code')
  }

  async function login(): void {
    window.electron.ipcRenderer.send('login')
    if (!verifyCodeNumber) {
      console.error('必须输入验证码')
      return
    }

    const loginManager = window.loginManager
    const DomainConfig = window.DomainConfig

    const { BaseUrl, LoginPath } = DomainConfig

    const headers = loginManager.headerIns.header

    const params = {
      username: 'YTYT1122',
      host: '192.168.3.53',
      action: 'loginMobile',
      secret: 'DZ',
      type: '0',
      random: verifyCodeNumber,
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
        console.log('login message：', loginMessage)
      }
    } catch (e) {
      console.error('Error:', e)
    }
  }

  return (
    <div className="login-page">
      <div>
        用户名：
        <input />
      </div>
      <div>
        密码：
        <input />
      </div>
      <div>
        验证码：
        <input value={verifyCodeNumber} onChange={(e) => setVerifyCodeNumber(e.target.value)} />
        {hasVerifyCode && <img src={verifyCodeImg} onClick={refreshCode} />}
      </div>
      <button onClick={login}>登录</button>
    </div>
  )
}

export default Login
