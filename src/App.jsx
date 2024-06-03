import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";

import About from "./page/user/about/About";
import Error from "./components/Error/Error";
import Homepage from "./page/user/homepage/Homepage";
import Navbar from "./page/Navbar/Navbar";
import SignIn from "./page/auth/signin/SignIn";

function App() {
    return (
        <>
            {/* <HeaderMegaMenu /> */}
            <Navbar />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/about" component={About} />
                <Route path="/signin" component={SignIn} />
                <Route exact path="/404" component={Error} />
                <Route exact path="*">
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </>
    );
}

export default App;
