import About from "./About";
import BeritaPage from "./BeritaPage";
import { Gallery } from "./Gallery";
import HeroHeader from "./HeroHeader";

const IndexPage = () => {
    return (
        <>
            <HeroHeader />

            <About />
            <BeritaPage />
            <Gallery />
        </>
    );
};

export default IndexPage;
