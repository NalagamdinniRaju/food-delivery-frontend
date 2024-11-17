import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
    const[menu, setMenu] = useState("home")
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext)

    const navigate= useNavigate()
    const logOut = () => {
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
    }

  return (
    <div className='navbar'>
        <Link to="/"><img src={assets.food_delivery_logo} alt='Logo' className='logo'/></Link>
        <ul className="navbar-menu">
            <Link onClick={() => {setMenu("home")}} className={menu === "home" ? "active" : ""}>Home</Link>
            <a href='#explore-menu' onClick={() => {setMenu("menu")}} className={menu === "menu" ? "active" : ""}>Menu</a>
            <a href='#app-downlaod' onClick={() => {setMenu("mobile-app")}} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
            <a href='#footer' onClick={() => {setMenu("contact-us")}} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="serach-icon" />
            <div className="nav-serach-icon">
               <Link to="/cart"> <img src={assets.basket_icon} alt="Cart Icon" className="baseket-icon" /></Link>
                <div className={getTotalCartAmount() === 0 ? " " : "dot" }></div>
            </div>
            {!token ?<button onClick={() => setShowLogin(true)} className="signIn">Sign In</button> :
              <div className="navbar-profile">
                <img src={assets.profile_icon} alt=''/>
                <ul className="nav-profile-dropdown">
                  <li onClick={() => navigate('/myorders')}> <img src={assets.bag_icon} alt="" /><p>Order</p></li>
                  <hr />
                  <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
              </div>
            }

        </div>
    </div>
  )
}

export default Navbar