import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";

import AdminRoute from "./page/auth/AdminRoute/AdminRoute";
import { AllBerita } from "./page/Berita/AllBerita";
import { AllGallery } from "./page/Galeri/AllGallery";
import { DaftarBerita } from "./Dashboard/Post/DaftarBerita";
import { Dashboard } from "./Dashboard/Dashboard";
import { DetailBerita } from "./page/Berita/DetailBerita";
import { Dokumen } from "./page/Dokumen/Dokumen";
// import About from "./page/user/about/About";
import Error from "./page/Error/Error";
import { Footer } from "./page/Footer/Footer";
import IndexPage from "./page/Homepage/IndexPage";
import { IndexProfil } from "./page/Profil/IndexProfil";
import Navbar from "./page/Navbar/Navbar";
import ScrollToTop from "./page/Homepage/ScrollToTop";
import SelayangPandang from "./page/Profil/SelayangPandang";
import SignIn from "./page/auth/signin/SignIn";
import StrukturOrganisasi from "./page/Profil/StrukturOrganisasi";
import { TambahBerita } from "./Dashboard/Post/TambahBerita";
import VisiMisi from "./page/Profil/VisiMisi";

function App() {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route path="/signin" component={SignIn} />

                {/* PROFIL PAGE */}
                <Route exact path="/profil/:tabValue" component={IndexProfil} />
                <Route
                    exact
                    path="/selayangpandang"
                    component={SelayangPandang}
                />
                <Route exact path="/visimisi" component={VisiMisi} />
                <Route
                    exact
                    path="/strukturorganisasi"
                    component={StrukturOrganisasi}
                />
                {/* PROFIL PAGE END */}

                {/* BERITA */}
                <Route exact path="/berita" component={AllBerita} />
                <Route exact path="/berita/:id" component={DetailBerita} />
                {/* BERITA END */}

                {/* DOKUMEN */}
                <Route exact path="/dokumen" component={Dokumen} />
                {/* DOKUMEN END */}

                {/* GALERI */}
                <Route exact path="/galeri" component={AllGallery} />
                {/* GALERI END */}

                {/* DASHBOARD */}
                <AdminRoute exact path="/dashboard" component={Dashboard} />

                <AdminRoute
                    exact
                    path="/dashboard/tambah-post"
                    component={TambahBerita}
                />

                <AdminRoute
                    exact
                    path="/dashboard/daftar-post"
                    component={DaftarBerita}
                />

                {/* DASHBOARD END */}

                {/* ERROR PAGE */}
                <Route exact path="/404" component={Error} />
                <Route exact path="*">
                    <Redirect to="/404" />
                </Route>
                {/* ERROR PAGE END */}
            </Switch>

            <Footer />

            <ScrollToTop />
        </div>
    );
}

export default App;
