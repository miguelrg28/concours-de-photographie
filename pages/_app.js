import '../styles/globals.css'
import Layout from '@/components/Layout'
import { poppins } from 'utils'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <Layout classFont={poppins.className}>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
