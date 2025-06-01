import Dashboard from './components/Dashboard';
import LoginAndSignUp from './components/LoginAndSignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InactivityHandler from './components/InactivityHandler';
export default function App(){
return(
    <>
    
    <BrowserRouter>
    <InactivityHandler/>
    <Routes>
      <Route path="/" element={<LoginAndSignUp />} />
      <Route path="/Dashboard/*" element = {<Dashboard />} />
    </Routes>
    </BrowserRouter>
    </>
      );
}