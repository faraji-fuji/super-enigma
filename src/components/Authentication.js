import { useState } from "react"
import axios from "axios"
import AuthActionButton from "./AuthActionButton"
import "./Authentication.css"


export default function Authentication({ handleAuthentication }) {
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const [isLogin, setIsLogin] = useState(true)
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleAuthActionButtonClick = () => {
        setIsLogin(!isLogin)
        setCredentials({ username: "", password: "" })
    }

    // register helper function
    const register = async () => {
        try {
            console.log("sending register request")
            const response = await axios.post(`${apiUrl}/users/`, credentials)
            setIsLogin(!isLogin)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data.detail)
            } else {
                console.log(error)
            }
        }
    }

    // login helper function
    const login = async () => {
        try {
            console.log("sending login request")
            const response = await axios.post(`${apiUrl}/api-token-auth/`, credentials)
            sessionStorage.setItem("authToken", response.data.token);
            sessionStorage.setItem("username", credentials.username);
            sessionStorage.setItem("isAuthenticated", true);
            handleAuthentication();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Incorrect username or password")
            } else {
                alert("An error occurred")
                console.log(error)
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        isLogin ? login() : register()
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
                    value={credentials.username}
                />

                <label className="form-label">Password</label>
                <input
                    className="form-input"
                    onChange={handleChange}
                    type='password'
                    required
                    name='password'
                    id='password'
                    value={credentials.password}
                />

                <button
                    className="form-button"
                    type='submit'
                >
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>

            <AuthActionButton
                isLogin={isLogin}
                handleAuthActionButtonClick={handleAuthActionButtonClick}
            />
        </div>
    )
}
