import { useLocation } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const location = useLocation();
    const userData = location.state.userData;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userId = userData._id
            let name = userData.name
            const response = await axios.get(`http://localhost:4000/:${userId}/getProductList`)

            if (response.status === 201 || response.status === 200) {
                const productList = response.data.data;
                // console.log(name)
                navigate(`/productList/${userId}`, { state: { productList, userData, name } });
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSubmitCart = async (e) => {
        e.preventDefault();
        try {
            let userId = userData._id
            const cartResponse = await axios.get(`http://localhost:4000/getCart/${userId}`)
            if (cartResponse.status === 200) {
                let userId = userData._id
                let name = userData.name
                let cartList = cartResponse.data
                // Handle success or navigation to cart page with updated cart data
                console.log('Updated cart data:', cartList);
                navigate(`/cartList/${userId}`, { state: { cartList, userData, name } });
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert(`${error.response.data.message}, got product list section`)
            if (error.response.status === 400) {
                let userId = userData._id
                let name = userData.name
                const response = await axios.get(`http://localhost:4000/:${userId}/getProductList`)

                if (response.status === 201 || response.status === 200) {
                    const productList = response.data.data;
                    // console.log(name)
                    navigate(`/productList/${userId}`, { state: { productList, userData, name } });
                }
            }
        }
    }


    return (
        <div>
            <h2>User Details</h2>
            <p>ID: {userData._id}</p>
            <p>Name: {userData.name}</p>
            <p>Address: {userData.address}</p>
            <div>
                <button onClick={handleSubmit}>Go To Product Section</button>
                <button onClick={handleSubmitCart}>Go To Your Cart</button>
                <button onClick={()=>navigate('/addProduct')}>Add New Product</button>
            </div>
        </div>
    );
};

export default UserDetails;
