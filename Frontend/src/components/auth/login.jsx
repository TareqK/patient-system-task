import React,{useState} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ApiService from '../../services/web/ApiService';
import Loader from '../../components/dashboard/common/Loader'
import { Link,useHistory } from "react-router-dom";
const Login = () => {

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const loginUser = () => {
        ApiService.post(`/auth/login`,{
                username:username,
                password:password
            })
        .then(res => {
            setLoading(false);
            history.push("/patients");
        })
        .finally((response) => {
            setLoading(false);
        });
    };

    return (
        <div className="auth-inner">
            <form onSubmit={(e)=>{e.preventDefault();return false;}}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control" placeholder="Enter Your username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                {loading ? (<Loader />) : (
                    <>
                        <button type="button" className="btn btn-primary btn-block" onClick={() => loginUser()}>Login</button>
                    <div className="d-flex justify-content-between">
                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                        <a className="nav-link" href="#">Forgot password?</a>
                    </div>
                            
                    </>
                )}
            </form>
        </div>
    );
}
export default Login;