import { useEffect, useRef, useState } from 'react';
import defaultImage from '../images/defaultImage.jpg';

function PersonalData({ userData, hashPassword }) {
const inputRef = useRef();
const [image, setImage] = useState(defaultImage);
const [name, setName] = useState('');
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [error, setError] = useState('');
const [success, setSuccess] = useState('');

const handleSubmit = (e) =>{
e.preventDefault();
let hashedCurrentPassword = hashPassword(currentPassword);
const numberRegex = /\d/;
if(newPassword.length < 6) {
setError("Password length must be greater than 6");
return false;
}
if(!numberRegex.test(newPassword)) {
setError("Password must contain one number");
return false;
}
if(hashedCurrentPassword != userData.password){
setError("Invalid current password");
}
if(hashedCurrentPassword == userData.password){
const requiredArray = JSON.parse(localStorage.getItem("readerDetails"));
const userIndex = requiredArray.findIndex((reader)=>userData.email===reader.email);
const newHashedPassword = hashPassword(newPassword);
requiredArray[userIndex].password = newHashedPassword;
localStorage.setItem("readerDetails", JSON.stringify(requiredArray));
setCurrentPassword('');
setNewPassword('');
setError('');
setSuccess("Successfully changed");
setTimeout(()=>{
  setSuccess("");
}, 5000)
}
}

const handleClick = () => {
inputRef.current.click();
};

const handleChange = (e) => {
const file = e.target.files[0];
if (file) {
const reader = new FileReader();
reader.onloadend = () => {
const base64String = reader.result;
setImage(base64String);
localStorage.setItem(userData.email, base64String);
};
reader.readAsDataURL(file);
}
};

// Function to truncate and capitalize first letter, then set name
function truncateAndCapitalize(input, setName, maxLength = 20) {
if (!input) {
setName('');
return;
}

let truncated = input.slice(0, maxLength);

// Avoid cutting mid-word by cutting at last space before maxLength
const lastSpaceIndex = truncated.lastIndexOf(' ');
if (lastSpaceIndex > 0) {
truncated = truncated.slice(0, lastSpaceIndex);
}

truncated = truncated.trim();
if (truncated.length > 0) {
truncated = truncated.charAt(0).toUpperCase() + truncated.slice(1);
}

setName(truncated);
}

// Load image from localStorage on userData.email change
useEffect(() => {
const savedImage = localStorage.getItem(userData.email);
if (savedImage) {
setImage(savedImage);
} else {
setImage(defaultImage);
}
}, [userData.email]);

// Update name when userData.name changes
useEffect(() => {
truncateAndCapitalize(userData.name, setName, 20);
}, [userData.name]);

return (
<>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<img
src={image}
alt="Your Profile picture"
onClick={handleClick}
title="Click to upload new picture"
className="shadow-sm"
style={{ height: '50px', width: '50px', borderRadius: '50%', cursor: 'pointer' }}
/>
<h3 style={{ fontFamily: "'Dancing Script', cursive", marginTop:'20px' }}>{name}</h3>
</div>
<input
type="file"
ref={inputRef}
onChange={handleChange}
accept="image/*"
style={{ display: 'none' }}
/>

<form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "400px" }}>
  {error && <div className="alert alert-danger py-2">{error}</div>}
  {success && <div className="alert alert-success py-2">{success}</div>}

  <div className="mb-3">
    <label htmlFor="currentPassword" className="form-label">Current Password</label>
    <input
      id="currentPassword"
      type="password"
      className="form-control"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      required
    />
  </div>

  <div className="mb-3">
    <label htmlFor="newPassword" className="form-label">New Password</label>
    <input
      id="newPassword"
      type="password"
      className="form-control"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />
  </div>

  <button type="submit" className="btn btn-primary w-100">Change Password</button>
</form>
</>
);
}

export default PersonalData;
