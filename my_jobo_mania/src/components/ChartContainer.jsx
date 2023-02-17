import BarChart from './BarChart.jsx'
import AreaChart from './AreaChart.jsx'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'
import {useState} from 'react'


function ChartContainer({data}) {
  // const {monthlyApplications:data} = useAppContext()
  const[barChart,setBarChart] = useState(true)

  return (
    <Wrapper>
      <h4>monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? "Switchto:Area Chart" : "Switchto:Bar Chart"}
      </button>
      {barChart ? 
       <BarChart data={data}/>
       :
       <AreaChart data={data} />
      }
    </Wrapper>
  )
}

export default ChartContainer
