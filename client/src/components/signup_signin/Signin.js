import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./signup.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {

    const [logdata, setData] = useState({
        email: "",
        password: "",
    })
    // console.log(logdata)

    const addData = (e) => {
        const { name, value } = e.target;

        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    }

    const sendData = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 400 || !data) {
            toast.warning("Invalid Details", {
                position: "top-center",
            })

        } else {
            toast.success("User Login Success", {
                position: "top-center",
            })
            setData({ ...logdata, email: "", password: "" });
        }

    }
    return (
        <>
            <section>
                <div className='sign_container'>
                    <div className='sign_header'>
                        <img src="./blacklogoamazon.png" alt="signupimg" />
                    </div>
                    <div className='sign_form'>
                        <form method='POST'>
                            <h1>Sign-In</h1>
                            <div className='form_data'>
                                <label htmlFor='email'>Email</label>
                                <input type="text" onChange={addData}
                                    value={logdata.email}
                                    name="email" id="email" />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='password'>Password</label>
                                <input type="password" onChange={addData}
                                    value={logdata.password}
                                    name="password" id="password" />
                            </div>
                            <button className='signin_btn' onClick={sendData}>Continue</button>
                        </form>
                    </div>
                    <div className='create_accountinfo'>
                        <p>New to amazone?</p>
                        <NavLink to="/register2"><button className=''>Create your amazone account</button></NavLink>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Signin