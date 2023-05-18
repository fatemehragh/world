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
    return (
        <ThemeProvider>
            <Head>
                <title>The World</title>
                <meta name="description" content="Explore the world" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&family=Poppins:wght@500&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            <main style={{margin:'50px 50px'}}>
                <Component {...pageProps} />
            </main>
        </ThemeProvider>
    );
}

export default MyApp;
