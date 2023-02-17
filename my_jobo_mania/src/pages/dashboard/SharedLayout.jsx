import {Outlet} from 'react-router-dom'
import BigSidebar from '../../components/BigSidebar'
import SmallSidebar from '../../components/SmallSidebar'
import Navbar from '../../components/Navbar'
import Wrapper from '../../assets/wrappers/SharedLayout'

function SharedLayout() {
 return (<Wrapper>
     <main className="dashboard">
    <SmallSidebar />
    <BigSidebar />
       <div>
   <Navbar />
   <div className="dashboard-page">
      <Outlet />
   </div>
       </div>
     </main>
   </Wrapper>

    )
}
export default SharedLayout