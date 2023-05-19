import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
// next
import Head from "next/head";
// context
import { ThemeProvider } from "@/contexts/ThemeContext";
// components
import Header from "../src/components/Header";
// styles
import "../src/styles/globals.css";
// Fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css';
// import the icons you need

//----------------------------------------------------------------


function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        ReactGA.initialize('G-DWD24940EJ');
        ReactGA.pageview(router.pathname + router.asPath);
    }, [router.pathname]);


    return (
        <ThemeProvider>
            <Head>
                <title>The World</title>
                <meta name="description" content="Explore the world" />
            </Head>
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
        </ThemeProvider>
    );
}

export default MyApp;
