export default function AuthActionButton({ isLogin, handleAuthActionButtonClick }) {
    return (
        isLogin ?
            (<div>
                <p>Don't have an account?. &nbsp;&nbsp;
                    <a href="#" onClick={handleAuthActionButtonClick}>Register</a>
                </p>

            </div>) :
            (<div>
                <p>
                    Have an account? &nbsp;&nbsp;
                    <a href="#" onClick={handleAuthActionButtonClick}>Login</a>
                </p>

            </div>)
    )

}