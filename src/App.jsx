import Dashboard from './components/Dashboard';
import LoginAndSignUp from './components/LoginAndSignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InactivityHandler from './components/InactivityHandler';
export default function App(){
function hashPassword(str) {
let hash = 0;
if (str.length === 0) return hash.toString();
for (let i = 0; i < str.length; i++) {
const char = str.charCodeAt(i);
hash = (hash << 5) - hash + char;
hash |= 0;
}
return hash.toString();
}

  return(
    <>
    
    <BrowserRouter>
    <InactivityHandler/>
    <Routes>
      <Route path="/" element={<LoginAndSignUp hashPassword={hashPassword} />} />
      <Route path="/Dashboard/*" element = {<Dashboard hashPassword={hashPassword}/>} />
    </Routes>
    </BrowserRouter>
    </>
      );
}