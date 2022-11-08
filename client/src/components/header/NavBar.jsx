import './navBar.css';
import logo from '../../assets/logo.png';
import linkedinIcon from '../../assets/linkedin_icon.png'
import githubIcon from '../../assets/github_icon.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navBar'>
        <div className="leftNav">
            <img className='logo' src={logo} alt="logo" />
            <Link className='link' to={'/home'}><h4>Home</h4></Link>
            <Link className='link' to={'/home'}><h4>About Us</h4></Link>
            <img className='social1' src={linkedinIcon} alt="social" />
            <img className='social2' src={githubIcon} alt="social" />
        </div>
        <div className="rightNav">
            <button type='button' className="login">Login</button>
            <button type='button' className="signUp">Sign up</button>
        </div>
    </div>
  )
}

export default NavBar