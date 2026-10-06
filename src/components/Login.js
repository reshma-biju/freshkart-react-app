import loginStyles from '../styles/login.module.css';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../services/AuthContext';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setisLoggedIn] = useContext(AuthContext);
    const unameRef = useRef();
    const pwordRef = useRef();

    const [unameErr, setUnameErr] = useState("");
    const [pwordErr, setPwordErr] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let isFormValid =validateForm();
        if(isFormValid) {
            login();
        }
    }

    const login = () => {
         const uname = unameRef.current.value;
        const pword = pwordRef.current.value;
        axios.post( "https://localhost:7281/api/Auth/login", {uname, pword})
        .then(
            (response) => {
            setisLoggedIn(true);
            navigate("/home");
        },
        (error) => {
            toast.error("Invalid username or password",{theme: "colored",autoClose: 3000});
        }
        )}

    const validateForm = () => {
        let isValid = false;
        const uname = unameRef.current.value;
        const pword = pwordRef.current.value;
        if (uname.trim() === "") {
            setUnameErr("Username is required");
        } else if (pword.trim() === "") {
            setUnameErr("");
            setPwordErr("Password is required");
        } else {
            setUnameErr("");
            setPwordErr("");
            isValid = true;
        }
        return isValid;
    }
    return (
        <div className={loginStyles.loginContainer}>
            <ToastContainer />
            <div className={loginStyles.heading}>Login</div>
            <div className={loginStyles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={loginStyles.formGroup}>
                        <label htmlFor="uname">Username</label>
                        <input type="text" name="uname" ref={unameRef} />
                        {unameErr.length > 0 ? (
                            <span className={loginStyles.error}>{unameErr}</span>
                        ) : null}
                    </div>
                    <div className={loginStyles.formGroup}>
                        <label htmlFor="pword">Password</label>
                        <input type="password" name="pword" ref={pwordRef} />
                        {pwordErr.length > 0 ? (
                            <span className={loginStyles.error}>{pwordErr}</span>
                        ) : null}
                    </div>
                    <button className={loginStyles.loginBtn} type="submit">Login</button>
                    <div className={loginStyles.registerLink}>Register</div>
                </form>
            </div>
        </div>
    )
}
export default Login;