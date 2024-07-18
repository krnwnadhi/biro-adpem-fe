import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ component: Component, ...rest }) => {
    //check if user logged in
    const user = useSelector((state) => state?.users);
    const { userAuth } = user;

    return (
        <Route
            {...rest}
            render={() =>
                userAuth?.isAdmin ? (
                    <Component {...rest} />
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    );
};

export default AdminRoute;
