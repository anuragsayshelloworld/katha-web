import { useEffect } from "react";
function Original({userData}){
useEffect(()=>{
const key = userData.email + "books";
const Mybooks = JSON.parse(localStorage.getItem(`${key}`)) || [];
if(Mybooks.length>0){
setShowBooks(true);
}else{
setMessage("You don't have any books!");
}},[userData]);
return(
<>
<h2>Your works</h2>
</>
)}

export default Original;