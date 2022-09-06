import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    })

    // console.log(udata)


    const addData = (e) => {
        const { name, value } = e.target;

        setUdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    }
    const sendData = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = udata;

        if (fname === "" || email === "" || mobile === "" || password === "" || cpassword === "") {
            toast.warning("Complete all the fields", {
                position: "top-center",
            })
        } else {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, mobile, password, cpassword
                })
            });
            const data = await res.json();

            if (res.status === 422 || !data) {
                toast.warning("Invalid Details", {
                    position: "top-center",
                })

            } else {
                toast.success("data succesfully added", {
                    position: "top-center",
                })

                setUdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" })

            }

        }

        // console.log(data);

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
                            <h1>Sign-up</h1>
                            <div className='form_data'>
                                <label htmlFor='fname'>Your name</label>
                                <input type="text" onChange={addData}
                                    value={udata.fname} name="fname" id="fname" />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='email'>Email</label>
                                <input type="text"
                                    onChange={addData}
                                    value={udata.email} name="email" id="email" />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='number'>Mobile</label>
                                <input type="text"
                                    onChange={addData}
                                    value={udata.mobile} name="mobile" id="mobile" />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='password'>Password</label>
                                <input type="password" name="password"
                                    onChange={addData}
                                    value={udata.password} id="password" placeholder='At least 6 char' />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='cpassword'>Password Again</label>
                                <input type="password" name="cpassword"
                                    onChange={addData}
                                    value={udata.cpassword} id="cpassword" />
                            </div>
                            <button className='signin_btn' onClick={sendData}>Continue</button>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Signup