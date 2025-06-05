import { useNavigate, Routes, Route, Link } from "react-router-dom";
import Library from "../pages/Library";
import UserProfile from "../pages/UserProfile";
import UserContext from "../context/UserContext";
import { useContext } from "react";

export default function Dashboard({hashPassword}) {
const navigate = useNavigate();
const {userData, setUserData} = useContext(UserContext);
const logout = () => {
localStorage.removeItem("remembrance");
localStorage.removeItem("temporary");
localStorage.removeItem("currentuserData");
setUserData('');
navigate("/", { replace: true });
};

return (
<div className="container mt-4">
<div className="d-flex justify-content-between align-items-center mb-4">
<button onClick={logout} className="btn btn-danger">
Log out
</button>
</div>

<nav className="nav nav-tabs mb-3">
<Link to="/Dashboard/UserProfile" className="nav-link">My Profile</Link>
<Link to="/Dashboard/Library" className="nav-link">Library</Link>
</nav>

<div className="card p-4 shadow-sm">
<Routes>
<Route index element={<UserProfile hashPassword={hashPassword}/>} />
<Route path="UserProfile" element={<UserProfile />} />
<Route path="Library" element={<Library />} />
</Routes>
</div>
</div>
);
}
