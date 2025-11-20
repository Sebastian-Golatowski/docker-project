import { useState } from 'react'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please enter both email and password')
      return
    }
    
    onLogin({ email, password })
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Email</label>
        <input
          type='text'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <input type='submit' value='Login' className='btn btn-block' />
    </form>
  )
}

export default Login