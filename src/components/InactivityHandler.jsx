import { useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function InactivityHandler() {
const { setUserData } = useContext(UserContext);
const navigate = useNavigate();

const maxInactivity = 30 * 60 * 1000;

const updateActivity = () => {
localStorage.setItem('lastActivity', Date.now().toString());
};

useEffect(() => {
if (!localStorage.getItem('lastActivity')) {
updateActivity();
}

window.addEventListener('mousemove', updateActivity);
window.addEventListener('keydown', updateActivity);
window.addEventListener('click', updateActivity);

const interval = setInterval(() => {
const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0', 10);
const now = Date.now();

if (now - lastActivity > maxInactivity) {
localStorage.removeItem('temporary');
localStorage.removeItem('currentuserData');
localStorage.removeItem('lastActivity');
setUserData(null);
navigate('/', { replace: true });
clearInterval(interval);
}
}, 10 * 1000); 

return () => {
clearInterval(interval);
window.removeEventListener('mousemove', updateActivity);
window.removeEventListener('keydown', updateActivity);
window.removeEventListener('click', updateActivity);
};
}, [navigate, setUserData]);

return null;
}

export default InactivityHandler;
