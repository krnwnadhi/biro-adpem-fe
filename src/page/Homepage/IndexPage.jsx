import About from "./About";
import AboutNew from "./AboutNew";
import BeritaPage from "./BeritaPage";
import { Gallery } from "./Gallery";
import HeroHeader from "./HeroHeader";

const IndexPage = () => {
    return (
        <>
            <HeroHeader />
            {/* <About /> */}
            <AboutNew />
            <BeritaPage />
            <Gallery />
        </>
    );
};

export default IndexPage;
