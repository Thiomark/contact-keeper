import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../context/alert/alertContext'
import AuthContext from '../context/auth/authContext'

const Login = (props) => {

    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext
    const { loginUser, error, clearError, isAuthenticated } = authContext

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const {email, password} = user

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/')
        }
        if(error === 'Invalid Credentials'){
            setAlert(error, 'danger')
            clearError()
        }
        // eslint-disable-next-line
    }, [error, props.history, isAuthenticated])

    const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(email && password){
            loginUser({email, password})
        }else {
            setAlert('Please enter all fields', 'danger')
        }
    }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input autoComplete="off" type="password" name="password" required value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login
