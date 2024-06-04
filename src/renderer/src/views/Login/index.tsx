import { useState, useEffect } from 'react'
import verifyCodeImg from '@renderer/assets/captcha.png'

function Login(): JSX.Element {
  const [verifyCode, setVerifyCode] = useState('')

  useEffect(() => {
    import('@renderer/assets/captcha.png').then((url) => {
      setVerifyCode(url)
    })
  })

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
      <div>验证码：{verifyCode && <img src={verifyCodeImg} />}</div>
      <button>登录</button>
    </div>
  )
}

export default Login
