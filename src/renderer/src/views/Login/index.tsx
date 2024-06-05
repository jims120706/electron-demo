import { useState, useEffect } from 'react'
import verifyCodeImg from '@renderer/assets/captcha.png'

function Login(): JSX.Element {
  const [hasVerifyCode, setVerifyCode] = useState('')
  const [verifyCodeNumber, setVerifyCodeNumber] = useState('')
  const Events = window.Events

  useEffect(() => {
    getCodeUrl()
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
