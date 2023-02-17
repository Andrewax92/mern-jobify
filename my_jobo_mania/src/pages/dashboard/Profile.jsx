import { useState } from 'react'
import {useAppContext} from '../../context/appContext'
import FormRow from '../../components/FormRow'
import Alert from '../../components/Alert'
import Wrapper from '../../assets/wrappers/DashboardFormPage'



function Profile() {
const {user,showAlert,displayAlert,updateUser,isLoading} = useAppContext()
// const {name,email,lastName,location} = user
// // const inititialState ={
//   name:name,
//   email:email,
//   lastName:lastName,
//   location:location
// }

const[name,setName]=useState(user?.name)
const[email,setEmail]=useState(user?.email)
const[lastName,setlastName]=useState(user?.lastName)
const[location,setLocation]=useState(user?.location)

// console.log(inititialState);
// const [userData,setUserData] = useState(inititialState)

// const handleChange = (e) => {
//   setUserData({...userData,[e.target.name]: e.target.value})
// }
const handleSubmit = (e) => {
  e.preventDefault()
  if(!name || !email || !lastName || !location){
    displayAlert()
    return
  }
   updateUser({name,email,lastName,location})
}
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow 
           type="text"
           name='name'
           value={name}
           handleChange={(e => setName(e.target.value))}
           />
          
          <FormRow 
          labelText='last name'
           type="text"
           name="lastName"
           value={lastName}
           handleChange={(e => setlastName(e.target.value))}
           />
          <FormRow 
           type="email"
           name="email"
           value={email}
           handleChange={(e => setEmail(e.target.value))}
           />
          <FormRow 
           type="text"
           name="location"
           value={location}
           handleChange={(e => setLocation(e.target.value))}
           />
           <button className='btn btn-block' type='submit' disabled={isLoading}>
                  {isLoading ? 'Please Wait....' : 'save changes'}
           </button>

        </div>

      </form>
    </Wrapper>
  )
}
export default Profile