export default function AuthActionButton({ isLogin, handleAuthActionButtonClick }) {
    return (
        isLogin ?
            (<div>
                <p>Don't have an account?.</p>
                <button onClick={handleAuthActionButtonClick}>Register</button>
            </div>) :
            (<div>
                <p>have an account?</p>
                <button onClick={handleAuthActionButtonClick}>Login</button>
            </div>)
    )

}