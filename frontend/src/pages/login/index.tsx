import type { NextPage } from 'next'


import { LoginForm } from '../../components/LoginForm/LoginForm' 
import { AppDescription } from '../../components/AppDescription/AppDescription'

const Login: NextPage = () => {
  return (
    <div className='items-center justify-center'>
      <div>
      <AppDescription />
      </div>
      <div>
      <LoginForm />
      </div>
    </div>
  )
}

export default Login