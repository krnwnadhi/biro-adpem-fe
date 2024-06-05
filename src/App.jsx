import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";

import About from "./page/user/about/About";
import Error from "./page/Error/Error";
import { Footer } from "./page/Footer/Footer";
import IndexPage from "./page/Homepage/IndexPage";
import Navbar from "./page/Navbar/Navbar";
import SignIn from "./page/auth/signin/SignIn";

function App() {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route path="/about" component={About} />
                <Route path="/signin" component={SignIn} />
                <Route exact path="/404" component={Error} />
                <Route exact path="*">
                    <Redirect to="/404" />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
