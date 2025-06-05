import {useContext} from 'react';
import UserContext from '../context/UserContext';
import PersonalData from './PersonalData';
import Original from './Original';

export default function UserProfile({hashPassword}){
const {userData} = useContext(UserContext);

return(
<>
<div className='container'>
<div className="row">
<div className="col-3"><PersonalData userData={userData} hashPassword={hashPassword}/></div>
<div className="col-3"><Original userData={userData}/></div>
<div className="col-6"></div>
</div>
</div>
</>
);   
}