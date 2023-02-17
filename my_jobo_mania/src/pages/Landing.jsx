
import main from '../assets/images/main.svg'
import Logo from '../components/Logo'
import {Link} from 'react-router-dom'
import Wrapper from '../assets/wrappers/LandingPage'


function Landing() {
  return (
    <Wrapper>
    <nav>
      <Logo />
    </nav>
    <div className='container page'>
      {/* info */}
      <div className='info'>
        <h1>
          job <span>tracking</span> app
        </h1>
        <p>
        Track your job applications and keep your job search organized, all in one place.
        </p>
        <Link to='/register' className='btn btn-hero'>
          Login/Register
        </Link>
      </div>
      <img src={main} alt='job hunt' className='img main-img' />
    </div>
  </Wrapper>
  )
}
export default Landing