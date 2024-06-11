import About from "./About";
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

            <ScrollToTop />

            <About />
        </>
    );
};

export default IndexPage;
