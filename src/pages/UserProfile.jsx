import {useContext} from 'react';
import UserContext from '../context/UserContext';
import PersonalData from './PersonalData';
export default function UserProfile(){
    const {userData} = useContext(UserContext);

 return(
    <>
    <div className='container'>
        <div className="row">
<div className="col-3"><PersonalData userData={userData}/></div>
<div className="col-2"></div>
<div className="col-7"></div>
        </div>
    </div>
    </>
 );   
}