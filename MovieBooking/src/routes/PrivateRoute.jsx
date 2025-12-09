import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element }) {
    const user = useSelector((state) => state.user?.userLogin);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return element;
}
