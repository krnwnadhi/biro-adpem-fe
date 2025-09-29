// import About from "./About";

import AboutNew from "./AboutNew";
import BeritaPage from "./BeritaPage";
import { Gallery } from "./Gallery";
import HeroHeader from "./HeroHeader";
import Layanan from "./Layanan";

const IndexPage = () => {
    return (
        <>
            <HeroHeader />
            {/* <About /> */}
            <AboutNew />
            <Layanan />
            <BeritaPage />
            {/* <Gallery /> */}
        </>
    );
};

export default IndexPage;
