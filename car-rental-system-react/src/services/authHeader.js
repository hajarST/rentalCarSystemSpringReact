import {useSelector} from "react-redux";

function AuthHeader() {
    const userDetails = useSelector((state) => state.userDetails);

    if (userDetails && userDetails.token) {
        return { Authorization: "Bearer " + userDetails.token };
    } else {
        return {};
    }
}

export default AuthHeader;