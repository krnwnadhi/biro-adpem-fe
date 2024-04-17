import { Navigate, Route, Routes } from "react-router-dom";

import About from "./page/user/about/About";
import Error from "./components/Error/Error";
import { HeaderMegaMenu } from "./components/HeaderMegaMenu/HeaderMegaMenu";
import Homepage from "./page/user/homepage/Homepage";
import SignIn from "./page/auth/signin/SignIn";

function App() {
    return (
        <>
            <HeaderMegaMenu />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/404" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
