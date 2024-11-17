import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
    const [currentState, setCurrentState] = useState("Sign Up")
    const [data, setData] = useState({name: "", password: "", email: ""})

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        // setData({...data, [e.target.name]: e.target.value})
        setData((prevData) => ({...prevData, [name]: value})) 
    }

    const{url,setToken} = useContext(StoreContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        let newUrl = url
        if (currentState === "Login"){
            newUrl = url + "/api/user/login"
        }else{
            newUrl = url + "/api/user/register"
        }
        const response = await axios.post(newUrl, data);
        console.log(response)
        if(response.status === 200){
            console.log(response)
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        }else{
            console.log(response.data.error)
            alert("Erorr")
        }
    }


  return (
    <div className='login-popup'>
        <form  className="login-popup-contaner" onSubmit={handleLogin}>
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState === "Login" ?  <></> :<input onChange={onChangeHandler} value={data.name}  type="text" placeholder="Enter Your Name" name="name" required />}
            <input  onChange={onChangeHandler} value={data.email} type="email" placeholder="Enter Your Email" name="email" required />
            <input  onChange={onChangeHandler} value={data.password} type="password" placeholder="Enter Password" name="password" required />
        </div>
        <button type='submit' >{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
        {
        currentState ==="Login" ? 
            <p> Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
            :<p>Already have and account <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        }
        </form>
    </div>
  )
}

export default LoginPopup