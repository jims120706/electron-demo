import { useState, useEffect } from 'react'
import verifyCodeImg from '@renderer/assets/captcha.png'

function Login(): JSX.Element {
  const [hasVerifyCode, setVerifyCode] = useState('')
  const [verifyCodeNumber, setVerifyCodeNumber] = useState('')
  const Events = window.Events

  useEffect(() => {
    getCodeUrl()
    window.electron.ipcRenderer.on(Events.HANDLE_LOGIN_DATA, (event, loginData) => {
      console.log('loginData in renderer', loginData)
      setLoginData(loginData)
    })
  })

  function getCodeUrl(): void {
    import('@renderer/assets/captcha.png').then((url) => {
      setVerifyCode(true)
    })
  }

  function refreshCode(): void {
    window.electron.ipcRenderer.send(Events.REFRESG_VERIFY_CODE)
  }

  async function login(): void {
    if (!verifyCodeNumber) {
      console.error('必须输入验证码')
      return
    }
    window.electron.ipcRenderer.send(Events.TRIGGER_LOGIN, verifyCodeNumber)
  }

  function setLoginData(loginMessage) {
    window.DataManager.USER_NAME = loginMessage.UserName
    window.DataManager.CODE = loginMessage.Code
    window.DataManager.apiUserToken = loginMessage.apiUserToken
    window.DataManager.ccData || (window.DataManager.ccData = btoa(JSON.stringify(loginMessage)))
    window.Connector.socket_host_arr = []
    window.Connector.socket_port_arr = []
    window.Connector.socket_host_index = 0
    const wsList = loginMessage.BailuLineList || loginMessage.LineList
    if (wsList && wsList.length > 0) {
      var i = 0,
        len = wsList.length
      for (
        window.Connector.socket_obj_arr || (window.Connector.socket_obj_arr = []);
        len > i;
        ++i
      ) {
        var wsItem = wsList[i]
        window.Connector.socket_obj_arr.push({
          host: wsItem.IP,
          port: wsItem.Port
        })
      }
    }
    window.Connector.pingHost()
    window.MessageHandler.getIns().connect()
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
