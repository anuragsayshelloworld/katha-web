import { useState, useEffect, useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import UserContext from "../context/UserContext";
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

export default function LoginAndSignUp({hashPassword}){
const [usersData, setUsersData] = useState([]);
const [todisplayeitherloginorsignup, setTodisplayeitherloginorsignup] = useState(true);
const [loginError, setLoginError] = useState('');
const [signUpError, setSignUpError] = useState('');


useEffect(()=>{
const readerDetails = JSON.parse(localStorage.getItem("readerDetails")) || [];
setUsersData(readerDetails); 
},[]);


const errorSetter = (err,type) => {
if(type === 1){  
setLoginError(err);
setTimeout(() => { setLoginError(''); }, 6000);
}
if(type === 2){
setSignUpError(err);
setTimeout(() => { setSignUpError(''); }, 6000);
}};

return(
<>
<div className="container-fluid" style={{ backgroundColor: '#FDF6EC', minHeight: '100vh' }}>
<div className="row">
<div className="col-7"> 
<Hero />   
</div>
<div className="col-5 mt-5">
{todisplayeitherloginorsignup ? <Login setLoginError={setLoginError} loginError={loginError} errorSetter={errorSetter} usersData={usersData} hashPassword={hashPassword} setTodisplayeitherloginorsignup={setTodisplayeitherloginorsignup} /> :  
<SignUp signUpError={signUpError} setSignUpError={setSignUpError} errorSetter={errorSetter} setTodisplayeitherloginorsignup = {setTodisplayeitherloginorsignup} hashPassword={hashPassword} usersData={usersData} setUsersData={setUsersData}/>} 
</div>
</div>
</div>
</>    
)}

function Login({setTodisplayeitherloginorsignup, hashPassword, usersData, errorSetter, loginError,setLoginError}){
const [loginEmail, setLoginemail] = useState('');
const [loginPassword, setLoginPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const Navigate = useNavigate();
const {setUserData} = useContext(UserContext);

useEffect(()=>{
const isLoggedIn = JSON.parse(localStorage.getItem("remembrance")) || JSON.parse(localStorage.getItem("temporary")) || false;   
if(isLoggedIn){
Navigate('/Dashboard', {replace:true});
}
},[]);

const handleLogin = (e) => {
e.preventDefault();
const isValidated = loginValidate(loginEmail, loginPassword);
const isVerified = loginVerification(loginEmail, loginPassword);
if(isVerified && isValidated && rememberMe === true){
localStorage.setItem("remembrance", JSON.stringify(loginEmail));
localStorage.setItem("currentuserData", JSON.stringify(isVerified));
setUserData(isVerified);
Navigate("/Dashboard",{replace:true});
}
else if(isVerified && isValidated && rememberMe === false){
localStorage.setItem("temporary", JSON.stringify(loginEmail));  
localStorage.setItem("currentuserData", JSON.stringify(isVerified));
setUserData(isVerified);
Navigate("/Dashboard",{replace:true});
}
else{
console.log("Unable to login. Please try again");
}
};

const loginVerification = (email, password) => {
const hashedPassword = hashPassword(password);
const user = usersData.find((item) => email === item.email  && item.password === hashedPassword);
if(user){
 console.log("found");   
return user;
}
else{
errorSetter("Wrong credential. Please try again",1);
return false;
}};

const loginValidate = (email, password) => {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberRegex = /\d/; 

if(!email || !password) {
errorSetter("You cannot leave the form empty",1);
return false;
}
if(!emailRegex.test(email)) {
errorSetter("Wrong credentials. Please try again.",1);
return false;
}
if (password.length < 6) {
errorSetter("Wrong credentials. Please try again.",1);
return false;
}
if (!numberRegex.test(password)) {
errorSetter("Wrong credentials. Please try again.",1);
return false;
}
setLoginError('');
return true;
};

return(
<>
{loginError && (
<div className="bg-light text-danger border border-danger rounded px-3 py-2 position-absolute shadow-sm" style={{ zIndex: 9999,
top: '35px', right: '28 5px', maxWidth: '90%', width: 'auto', fontSize: '0.95rem', fontWeight: '500',}}>{loginError}</div>)}
<div className="card mt-5 shadow-sm" style={{maxWidth:'440px', backgroundColor:'#FAF6EA'}}>    
<div className="card-header fw-medium" style={{backgroundColor:'##F9E79F'}}>Login</div>
<div className="card-body" style={{maxWidth:'420px'}}>
<form onSubmit={handleLogin}>
<div className="mb-3">
<label htmlFor="email" className="form-label fw-medium">Email address</label>
<input style={{ borderRadius: '8px', borderColor: '#dee2e6', padding: '10px 12px'}}type="text" className="form-control shadow-sm" placeholder="Enter your email" onChange={(e)=>setLoginemail(e.target.value)} value={loginEmail} id="email"/>
</div>
<div className="mb-3">
<label htmlFor="password" className="form-label fw-medium">Password</label>
<div className="input-group">
<input style={{ borderRadius: '8px', borderColor: '#dee2e6', padding: '10px 12px'}} type={showPassword ? 'text' : 'password'} className="form-control shadow-sm" placeholder="Enter your password" onChange={(e)=>setLoginPassword(e.target.value)} value={loginPassword} id="password"/>
<span onClick={()=>setShowPassword(!showPassword)} className="input-group-text" style={{ cursor: "pointer" }}>{showPassword ? '🔒': '🔓'}</span>
</div>
</div>
<div className="mb-3 form-check">
<input type="checkbox" className="form-check-input" onChange={(e)=>setRememberMe(e.target.checked)} checked={rememberMe} id='remember'/>
<label className="form-check-label" htmlFor="remember">Remember me</label>
</div>
<button type="submit" className="btn w-100 shadow-sm" style={{backgroundColor:'#905A30',color:'#FFFFFF'}}>Login</button>
</form>

{/* Forget password and Sign up Link below*/}
<div className="text-center mt-3">
<a href="#" className="d-block mb-2 text-decoration-none">Forgot password?</a>
<span>Don't have an account?{' '}<a href="#" className="text-decoration-none" onClick={()=>setTodisplayeitherloginorsignup(false)}>Sign up</a></span>
</div>
</div>
</div>
</>
);}

function SignUp({usersData,setTodisplayeitherloginorsignup,hashPassword,errorSetter,signUpError,setSignUpError}){
const [agreement, setAgreement] = useState(false);
const [signUpEmail, setSignUpEmail] = useState('');
const [signUpPassword, setSignUpPassword] = useState('');
const [showPassword, setShowPassword] = useState(false); 
const [name, setName] = useState('');
const [actualPin, setActualPin] = useState('');
const [enteredPin, setEnteredPin] = useState('');
const [showModal, setShowModal] = useState(false);
const [messageSent, setMessageSent] = useState('');
const [failureMessage,setFailureMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [showSucess, setShowSucess] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const { setUserData } = useContext(UserContext); 

const handleSignUp = async (e) => {
e.preventDefault();
const isValid = signUpValidate(signUpEmail, signUpPassword, name);
if (!isValid) return;
const isVerified = signUpVerified(signUpEmail);
if (!isVerified) return; 
const pin = Math.floor(1000 + Math.random() * 9000).toString(); 
setIsLoading(true);
const success = await sendPin({ email: signUpEmail, pin_code: pin });
setIsLoading(false);
if (success) {
setMessageSent("A 4-digit pin has been sent to your email");
setActualPin(pin);
setShowModal(true); 
}
else{
errorSetterr("Trouble sending email.")    
}};

const signUpVerified = (email) => {
const emailExists = usersData.some((item) => email === item.email);
if (emailExists) {
errorSetter("User with this email already exists");
return false;
}
return true;
};

const signUpValidate = (email, password, name) => {
email = email.trim();
password = password.trim();
name = name.trim();

if(!agreement){
errorSetter("You must agree to our terms and policies",2);
return false;    
}
if (!email || !password || !name) {
errorSetter("You cannot leave the form empty",2);
return false;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberRegex = /\d/;
const nameRegex = /^[a-zA-Z\s]{2,30}$/;

if (!nameRegex.test(name)) {
errorSetter("Name must be 2–30 letters long and contain only letters and spaces",2);
return false;
}
if(!emailRegex.test(email)) {
errorSetter("The email is invalid",2);
return false;
}
if(password.length < 6) {
errorSetter("Password length must be greater than 6",2);
return false;
}
if(!numberRegex.test(password)) {
errorSetter("Password must contain one number",2);
return false;
}
setSignUpError('');
return true;
};

const sendPin = async ({ email, pin_code }) => {
try{
await emailjs.send(
'service_6vjrpop',
'template_5ri4xxa',
{ email, pin_code },
'cm1wHY7sIZ75KbKOv'
);
return true;
} catch (err) {
console.error('PIN send failed', err);
return false;
}
};

const verifyPin = () => {   
if(enteredPin.trim() === actualPin){
const hashedPassword = hashPassword(signUpPassword.trim());
let newUser = {
name: name,
email: signUpEmail,
password: hashedPassword,
role: 0,    
}
let updatedUserData = [...usersData, newUser];
localStorage.setItem("readerDetails",JSON.stringify(updatedUserData));
setShowModal(false);
setActualPin('');
setEnteredPin('');
setFailureMessage('');
setMessageSent('');
setSuccessMessage('Your account has been successfully created!');
setShowSucess(true);

setTimeout(()=>{
setSuccessMessage('');
setShowSucess(false);
setTodisplayeitherloginorsignup(true);
window.location.reload();
},2000);

}
else{
setFailureMessage('Pin does not match. Please try again')
}}

return(
<>
{showSucess && (
<div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
<div className="bg-white p-4 rounded shadow" style={{ minWidth: '300px' }}>
<h6><p style={{color:'green',display:"block"}}>{successMessage}</p></h6>
</div>
</div>
)}

{showModal && (
<div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
<div className="bg-white p-4 rounded shadow" style={{ minWidth: '300px' }}>
<h5 className="mb-3">Enter Verification PIN</h5>
<h6><p style={{color:'green',display:"block"}}>{messageSent}</p></h6>
<h6><p style={{color:'red',display:"block"}}>{failureMessage}</p></h6>

<input type="text" className="form-control mb-3" value={enteredPin} onChange={(e) => setEnteredPin(e.target.value)} maxLength={4} placeholder="4-digit code"/>
<div className="d-flex justify-content-between">
<button className="btn btn-success me-2" onClick={verifyPin}>Verify</button>
<button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
</div>
</div>
</div>
)}

{signUpError && (
<div className="bg-light text-danger border border-danger rounded px-3 py-2 position-absolute shadow-sm" style={{ zIndex: 9999,
top: '35px', right: '245px', maxWidth: '90%', width: 'auto', fontSize: '0.95rem', fontWeight: '500',}}>{signUpError}</div>)}

<div className="card mt-5 shdaow-sm" style={{maxWidth:'420px', backgroundColor: '#FDF6EC'}}>    
<div className="card-header">Sign up</div>
<div className="card-body" style={{maxWidth:'420px'}}>
{/* Form starts below*/}

<form onSubmit={handleSignUp}>
<div className="mb-3">
<label htmlFor="name" className="form-label fw-medium">Fullname</label>
<input type="text" className="form-control shadow-sm" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} value={name} id="name"/>
</div>
<div className="mb-3">
<label htmlFor="email" className="form-label fw-medium">Email address</label>
<input type="text" className="form-control shadow-sm" placeholder="Enter your email" onChange={(e)=>setSignUpEmail(e.target.value)} value={signUpEmail} id="email"/>
</div>
<div className="mb-3">
<label htmlFor="password" className="form-label fw-medium">Password</label>
<div className="input-group">
<input type={showPassword ? 'text' : 'password'} className="form-control shadow-sm" placeholder="Enter your password" onChange={(e)=>setSignUpPassword(e.target.value)} value={signUpPassword} id="password"/>
<span onClick={()=>setShowPassword(!showPassword)} className="input-group-text" style={{ cursor: "pointer" }}>{showPassword ? '🔒': '🔓'}</span>
</div>
</div>
<div className="mb-3 form-check">
<input type="checkbox" className="form-check-input" onChange={(e)=>setAgreement(e.target.checked)} checked={agreement} id='agreement'/>
<label className="form-check-label" htmlFor="agreement">I agree to the <a href="#" className="text-decoration-none">terms and policies</a></label>
</div>

{isLoading && (
<div className="d-flex justify-content-center my-3">
<div className="spinner-border text-primary" role="status">
<span className="visually-hidden">Loading...</span>
</div>
</div>
)}
  
<button type="submit" className="btn btn-success w-100" disabled={isLoading}>{isLoading ? 'Sending...' : 'Sign Up'}</button>
</form>
<div className="text-center mt-3">
<a href="#" className="text-decoration-none" onClick={()=>setTodisplayeitherloginorsignup(true)}>Go back to login</a>
</div>
</div>
</div>
</>
);     
}

const Hero = () => {
const [hoveredIndex, setHoveredIndex] = useState(null);
const cardStyle = (index) => ({
display: 'flex',
alignItems: 'flex-start',
padding: '0px',
marginBottom: '16px',
borderBottom: '1px solid #dee2e6',
borderRadius: '10px',
backgroundColor: hoveredIndex === index ? '#f9f9f9' : 'transparent',
boxShadow: hoveredIndex === index ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
transition: 'background-color 0.3s, box-shadow 0.3s',
cursor: 'pointer'
});
const imageStyle = {
width: '100px',
height: '100px',
objectFit: 'cover',
marginRight: '16px',
borderRadius: '8px',
boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
border: '1px solid #ccc'
};

return (
<>
<h1 style={{ fontFamily: `'Dancing Script', cursive`, color: '#5C4033', marginLeft: '110px', marginTop: '55px'}}>KathaReader</h1>
<div className="container my-4" style={{ marginLeft: '100px' }}>
<div style={cardStyle(0)} onMouseEnter={() => setHoveredIndex(0)} onMouseLeave={() => setHoveredIndex(null)}>
<img src={image1} alt="Award" style={imageStyle} />
<div>
<h5 style={{ marginBottom: '4px' }}>KathaReader Spirity Awards 2025</h5>
<p style={{ margin: 0 }}>Become an author and win NPR. 50,000!</p>
</div></div>
<div style={cardStyle(1)} onMouseEnter={() => setHoveredIndex(1)} onMouseLeave={() => setHoveredIndex(null)}>
<img src={image2} alt="Benefits" style={imageStyle} />
<div>
<h5 style={{ marginBottom: '4px' }}>KathaReader Author Benefits</h5>
<p style={{ margin: 0 }}>Why should you start your writing journey here at KathaReader?</p>
</div></div>
<div style={cardStyle(2)} onMouseEnter={() => setHoveredIndex(2)} onMouseLeave={() => setHoveredIndex(null)}>
<img src={image3} alt="Bonus" style={imageStyle} />
<div>
<h5 style={{ marginBottom: '4px' }}>More Novels and Bonus!</h5>
<p style={{ margin: 0 }}>Download the App to get coins, FP, badges, and frames!</p>
</div></div></div>
</>
);};
