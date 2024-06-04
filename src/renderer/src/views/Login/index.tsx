import { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron';
import verifyCodeImg from '@renderer/assets/captcha.png'

function Login(): JSX.Element {
  const [verifyCode, setVerifyCode] = useState('')

  useEffect(() => {
    getCodeUrl()
  })

  function getCodeUrl(): void {
    import('@renderer/assets/captcha.png').then((url) => {
      setVerifyCode(url)
    })

  }

  function refreshCode(): void {
    window.electron.ipcRenderer.send('refresh-verify-code')
  }

  function login(): void{
    window.electron.ipcRenderer.send('login')
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
      <div>验证码：{verifyCode && <img src={verifyCodeImg} onClick={refreshCode}/>}</div>
      <button onClick={login}>登录</button>
    </div>
  )
}

export default Login
