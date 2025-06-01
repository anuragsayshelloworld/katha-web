import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import UserContext from './context/UserContext.jsx'

function UserProviderWrapper(){
const [userData, setUserData] = useState('');

useEffect(() => {
  const item = localStorage.getItem("currentuserData");
  if (item) {
    setUserData(JSON.parse(item));
  }
}, []);


return(
<UserContext.Provider value={{userData, setUserData}}>
<App />
</UserContext.Provider>
);
}


createRoot(document.getElementById('root')).render(
<StrictMode>
<UserProviderWrapper />
</StrictMode>,
)
