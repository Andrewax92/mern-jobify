import { useEffect } from "react"
import{useAppContext} from '../../context/appContext'
import StatsContainer from '../../components/StatsContainer'
import ChartContainer from '../../components/ChartContainer'
import Loading from '../../components/Loading'

function Stats() {
  
  const{showStats,isLoading,monthlyApplications:data} = useAppContext()
  useEffect(()=>{
     showStats()
   
    
  },[])

  if(isLoading){
     return<Loading center /> 
  }
  return (
    <>
    <StatsContainer />
    {data.length > 0 &&
      <ChartContainer data ={data}/>
    }
  
    
    </>
  )
}
export default Stats