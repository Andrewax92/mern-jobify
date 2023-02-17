import { useAppContext } from "../context/appContext";
import NavLinksComponent from "./NavLinksComponent";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/BigSidebar";

function BigSidebar() {
  const {showSidebar} = useAppContext()
  return (   
<Wrapper>
<div
className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container '}
>
  <div className="content">
    <header>
      <Logo/>
    </header>
    <NavLinksComponent />
  </div>

</div>
</Wrapper>

  )
}
export default BigSidebar