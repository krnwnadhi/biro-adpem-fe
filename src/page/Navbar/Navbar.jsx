import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";
import { useSelector } from "react-redux";

const Navbar = () => {
    //get user from store
    const state = useSelector((state) => state.users);

    const { userAuth } = state;

    const isAdmin = userAuth?.isAdmin;

    return <>{isAdmin ? <NavbarAdmin /> : <NavbarUser />}</>;
};

export default Navbar;
