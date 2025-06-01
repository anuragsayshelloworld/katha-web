import { useNavigate } from "react-router-dom";
export default function Dashboard(){
    const Navigate = useNavigate();
    const logout = () =>{
    localStorage.removeItem("remembrance");
    Navigate("/", {return: true});

    }
    return(<button onClick={logout}>Log out</button>);
}