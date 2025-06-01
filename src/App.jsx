import Dashboard from './components/Dashboard';
import LoginAndSignUp from './components/LoginAndSignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App(){
return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginAndSignUp />} />
      <Route path="/App" element = {<Dashboard />} />
    </Routes>
    </BrowserRouter>
    </>
      );
}