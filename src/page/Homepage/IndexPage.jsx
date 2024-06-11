import About from "./About";
import BeritaPage from "./BeritaPage";
import HeroHeader from "./HeroHeader";
import ScrollToTop from "./ScrollToTop";
import { useEffect } from "react";

const IndexPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HeroHeader />
            <About />
            <BeritaPage />

            <ScrollToTop />
        </>
    );
};

export default IndexPage;
