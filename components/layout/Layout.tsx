import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { Navbar } from '../ui/Navbar';

interface Props extends PropsWithChildren{
    title?:string
}

export const Layout:React.FC<Props> = ({children,title}) => {
  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name="author" content="Andres Tejada" />
            <meta name="description" content="informacion sobre el pokemon xxx" />
            <meta name="keywords" content="xxxx , pokedex" />
        </Head>
        <Navbar/>
        <main style={{
          padding: '0px 20px'
        }} >
            {children}
        </main>
    </>
  )
}
