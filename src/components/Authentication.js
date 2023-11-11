import { useState } from "react"
import axios from "axios"
import AuthActionButton from "./AuthActionButton"


export default function Authentication({ handleAuthentication }) {
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const [isLogin, setIsLogin] = useState(true)

    // check if we're logging in or registering
    let action = "";
    isLogin ? action = "Login" : action = "Register"

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
            axios.post("http://127.0.0.1:8000/api-token-auth/", credentials)
                .then((response) => {
                    sessionStorage.setItem("authToken", response.data.token);
                    handleAuthentication();
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            // register
            axios.post("http://127.0.0.1:8000/users/", credentials)
                .then((response) => {
                    setIsLogin(!isLogin)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <label>Email</label>

                <input
                    onChange={handleChange}
                    type='email'
                    required
                    name='username'
                    id='username'
                />

                <label>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    required
                    name='password'
                    id='password'
                />

                <button type='submit'>{action}</button>
            </form>

            <AuthActionButton isLogin={isLogin} handleAuthActionButtonClick={handleAuthActionButtonClick} />
        </div>
    )
}