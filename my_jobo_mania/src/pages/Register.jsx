import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/RegisterPage'
import FormRow from '../components/FormRow'
import Alert from '../components/Alert'
import { useAppContext } from '../context/appContext'



const inititialState = {
    name :'',
    email : '',
    password : '',
    isMember : false,
   
}

function Register() {
    const[values,setValues] = useState(inititialState)
    const navigate = useNavigate()
    const {showAlert,isLoading,displayAlert,clearAlert,registerUser,user,loginUser} = useAppContext()
    // console.log(values);
    // global state and useNavigate
const toggleMember = () => {
    setValues({...values, isMember : !values.isMember})
}
const handleChange = (e) => {
   setValues({...values,[e.target.name]: e.target.value})
}
const onSubmit = (e) => {
    e.preventDefault()

    const {name,email,password,isMember} = values
    
    if(!email || !password || (!isMember && !name)){
        displayAlert()
        clearAlert()
        return
    }
    const currentUser = {name,email,password}
    if(isMember){
      loginUser(currentUser)
    }else{
      registerUser(currentUser)
    }
}
useEffect(() => {
  if(user){
    setTimeout(() =>{
    navigate('/')
    },3000)
  }
},[navigate,user])
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit} >
          <Logo />
         {values.isMember ? <h3>Login</h3> : <h3>Register</h3>}
          {showAlert && <Alert />}
         {/* name input */}
      {!values.isMember &&  <FormRow
           type="text"
           name="name"
           value={values.name}
           handleChange={handleChange}/>}


        {/* email input */}
         <FormRow
           type="email"
           name="email"
           value={values.email}
           handleChange={handleChange}/>

        {/* password input */}
         <FormRow
           type="password"
           name="password"
           value={values.password}
           handleChange={handleChange}/>
         
         
         <button className="btn btn-block" disabled={isLoading}>Submit</button>
         <p>
             {values.isMember ? "Not a member yet ?" : "Already a member?"}
         <button type='button' onClick={toggleMember} className='member-btn'>
             {values.isMember ? "Register" : "Login" }
         </button>
         </p>
      </form>
    </Wrapper>
  )
}
export default Register