import About from "./About";
import BeritaPage from "./BeritaPage";
import { Gallery } from "./Gallery";
import HeroHeader from "./HeroHeader";
import ScrollToTop from "./ScrollToTop";

const IndexPage = () => {
    return (
        <>
            <HeroHeader />
            <About />
            <BeritaPage />
            <Gallery />

            <ScrollToTop />
        </>
    );
};

export default IndexPage;
