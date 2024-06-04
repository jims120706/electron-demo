import { useState, useEffect } from 'react'

function Login(): JSX.Element {
  const [verifyCodeVisible, setVerifyCodeVisible] = useState(false)

  useEffect(() => {
    setVerifyCodeVisible(true)
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
      <div>验证码：{verifyCodeVisible && <img src="../../assets/captcha.png" />}</div>
    </div>
  )
}

export default Login
