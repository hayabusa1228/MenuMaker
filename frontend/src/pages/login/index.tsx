import type { NextPage } from 'next'
import { getCsrfToken } from "next-auth/react";
import { GetServerSideProps } from "next";
import { CtxOrReq } from "next-auth/client/_utils";


import { LoginForm } from '../../components/LoginForm/LoginForm' 
import { AppDescription } from '../../components/AppDescription/AppDescription'

const Login: NextPage<{csrfToken : string}> = ({ csrfToken } ) => {
  return (
    <div className='items-center justify-center'>
      <div>
      <AppDescription />
      </div>
      <div>
      <LoginForm csrfToken={csrfToken}/>
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (
  context: CtxOrReq | undefined
) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    },
  };
};