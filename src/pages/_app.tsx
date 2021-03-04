import { Nav } from '../components/Nav'
import '../styles/globals.css'
import { LoginContext, LoginProvider } from '../contexts/LoginContext'
import '../styles/scrollbar.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LoginProvider>
        <Nav />
        <Component {...pageProps} />
      </LoginProvider>
    </>
  )
}

export default MyApp
