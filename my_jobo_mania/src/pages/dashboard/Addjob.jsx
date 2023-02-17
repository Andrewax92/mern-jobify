import {useAppContext} from '../../context/appContext'
import FormRow from '../../components/FormRow'
import Alert from '../../components/Alert'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRowSelect } from '../../components/FormRowSelect'

function Addjob() {
 
  const {showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    status,
    statusOptions,
    jobType,
    jobTypeOptions,
    isEditing,
    handleChange,
    clearValues,
    createJob,
    editJob
  } = useAppContext()

const handleJob = (e) => {
  const name = e.target.name
  const value = e.target.value
 handleChange({name,value})
}
const handleSubmit = (e) =>{
  e.preventDefault()
  if(!position || !company || !jobLocation){
     displayAlert()
     return
  }
  if(isEditing){
     editJob()
  }else {
  createJob()
  }

}
return<Wrapper>
<form >
  <h3>{isEditing ? 'edit job' : 'Add job'}</h3>
  {showAlert && <Alert />}
  <div className="form-center">
    {/* Position */}
    <FormRow 
     type="text"
     value={position}
     name='position' 
     handleChange={handleJob}
    
     />

    {/* company */}
    <FormRow type="text"
     value={company} 
     name='company' 
     handleChange={handleJob}
  
    />

    {/* location*/}
    <FormRow type="text"
     labelText = 'job location'
     value={jobLocation}
     name='jobLocation' 
     handleChange={handleJob}

    />
    <FormRowSelect 
     name='status'
     value={status}
     handleChange={handleJob} 
     list={statusOptions}/>
   
    <FormRowSelect 
     name='jobType'
     labelText="job type"
     value={jobType}
     handleChange={handleJob} 
     list={jobTypeOptions}/>
   

   {/* job Status */}
   <div className="bn-container">
  <button 
  className="btn btn-block submit-btn"
  type='submit'
  onClick={handleSubmit}>
    submit
  </button>
  <button
    className="btn btn-block clear-btn"
    onClick={
      (e) => {
        e.preventDefault()
        clearValues()
      }
    }>
    clear
  </button>
</div>
</div>
</form>
</Wrapper>
}
export default Addjob