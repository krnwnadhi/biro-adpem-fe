import AllBeritaNew from "./AllBeritaNew";
import DokumenKebijakanKeuangan from "./DokumenKebijakanKeuangan";
import GaleriNew from "./GaleriNew";
import InformasiMagang from "./InformasiMagang";
import InformasiPengumuman from "./InformasiPengumuman";
import StandarOperasionalProsedur from "./StandarOperasionalProsedur";

const IndexPublikasi = () => {
    return (
        <>
            <AllBeritaNew />
            <InformasiPengumuman />
            {/* <DokumenKebijakanKeuangan />
            <StandarOperasionalProsedur />
            <InformasiMagang /> */}
            <GaleriNew />
        </>
    );
};

export default IndexPublikasi;
