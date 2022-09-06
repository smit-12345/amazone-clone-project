import { Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./cart.css";
import { Logincontext } from '../context/ContextProvider';

const Cart = () => {

    const { id } = useParams("");

    const history = useNavigate()


    const { account, setAccount } = useContext(Logincontext);


    const [individualdata, setIndividualdata] = useState("");

    // console.log(individualdata.title['shortTitle']);



    const getindividualdata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        // console.log();
        if (res.status !== 201) {
            console.log("no data available");
        } else {
            console.log("getdata");
            setIndividualdata(data)
        }
    }


    useEffect(() => {
        getindividualdata();
    }, [id])


    //add to cart function
    const addtocart = async (id) => {
        const checkRes = await fetch(`/addcart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                individualdata
            }),
            credentials: "include"
        });

        const data1 = await checkRes.json();
        // console.log((data1));

        if (checkRes.status === 401 || !data1) {
            // console.log("User invalid");
            alert("User invalid");

        } else {
            // alert("added to cart")
            setAccount(data1)
            history("/buynow")
        }
    }
    return (
        <div className='cart_section'>
            <div className='cart_container'>
                <div className='left_cart'>
                    <img src={individualdata.detailUrl} alt='cart' />
                    <div className='cart_btn'>
                        <button className='cart_btn1' onClick={() => addtocart(individualdata.id)}>Add to cart</button>
                        <button className='cart_btn1'>Buy Now</button>
                    </div>
                </div>
                <div className='right_cart'>
                    <h3>{individualdata.title?.shortTitle}</h3>
                    <h4>{individualdata.title?.longTitle}</h4>
                    <Divider />
                    <p className='mrp'>M.R.P. : ₹{individualdata.price?.mrp}.00</p>
                    <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{individualdata.price?.cost}.00</span></p>
                    <p>You save : <span style={{ color: "#B12704" }}>₹{individualdata.price?.mrp - individualdata.price?.cost} ({individualdata.price?.discount})</span></p>

                    <div className="discount_box">
                        <h5 >Discount : <span style={{ color: "#111" }}>{individualdata.discount}</span> </h5>
                        <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                        <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{individualdata.description}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart