import Head from "next/head";
import {ThemeContext, ThemeProvider} from "@/contexts/ThemeContext";
import Header from "../src/components/Header";
import "../src/styles/globals.css";
import {useContext, useEffect} from "react";

function MyApp({ Component, pageProps }) {

    return (
        <ThemeProvider>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&family=Poppins:wght@500&display=swap" rel="stylesheet"/>
            </Head>
            <Header />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
