import { useState } from "react"
import axios from "axios"
import AuthActionButton from "./AuthActionButton"
import "./Authentication.css"


export default function Authentication({ handleAuthentication }) {
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const [isLogin, setIsLogin] = useState(true)
    const apiUrl = process.env.REACT_APP_API_URL;

    // check if we're logging in or registering
    let action = isLogin ? "Login" : "Register"

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleAuthActionButtonClick = () => {
        setIsLogin(!isLogin)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (isLogin) {
            // get token and store in sessionStorage
            axios.post(`${apiUrl}/api-token-auth/`, credentials)
                .then((response) => {
                    sessionStorage.setItem("authToken", response.data.token);
                    sessionStorage.setItem("username", credentials.username);
                    sessionStorage.setItem("isAuthenticated", true)
                    handleAuthentication();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        alert("Incorrect username or password")
                    }
                })
        } else {
            // register
            axios.post(`${apiUrl}/users/`, credentials)
                .then((response) => {
                    setIsLogin(!isLogin)
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        alert(error.response.data.detail)
                    }
                })
        }
    }

    return (
        <div className="container">
            <form method='POST' onSubmit={handleSubmit}>

                <label className="form-label">Email</label>
                <input
                    className="form-input"
                    onChange={handleChange}
                    type='email'
                    required
                    name='username'
                    id='username'
                />

                <label className="form-label">Password</label>
                <input
                    className="form-input"
                    onChange={handleChange}
                    type='password'
                    required
                    name='password'
                    id='password'
                />

                <button className="form-button" type='submit'>{action}</button>
            </form>

            <AuthActionButton isLogin={isLogin} handleAuthActionButtonClick={handleAuthActionButtonClick} />

        </div>
    )
}