import { useLocation } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const location = useLocation();
    const productList = location.state.productList;
    const name = location.state.name;
    const userData = location.state.userData;
    // console.log(productList, name)


    const navigate = useNavigate();

    const handleAddToCart = async (productId) => {
        let userId = userData._id
        let name = userData.name
        try {
            const response = await axios.post(`http://localhost:4000/addToCart/${userId}/${productId}`);
            console.log("add to cart", response.data)
            if (response.status === 201 || response.status === 200) {
                // Fetch updated cart data
                alert(`${response.data.message}, go to cart page`)

                const cartResponse = await axios.get(`http://localhost:4000/getCart/${userId}`);
                if (cartResponse.status === 200) {
                    let cartList = cartResponse.data
                    // Handle success or navigation to cart page with updated cart data
                    console.log('Updated cart data:', cartList);
                    navigate(`/cartList/${userId}`, { state: { cartList, userData, name } });

                }
            }

            // if (response.status === 201 || response.status === 200) {
            //     const cartList = response.data.data;
            //     // console.log(name)
            // }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response.status === 400) {
                alert(error.response.data.message)
            }
        }
    };

    return (
        <div>
            <h2>Product List for {name}</h2>
            <ul>
                {productList.map(product => (
                    <li key={product._id}>
                        <p>ID: {product._id}</p>
                        <p>Name: {product.productName}</p>
                        <p>Price: {product.price}</p>
                        <p>discount: {product.discount}</p>
                        <p>discountedAmount: {product.discountedAmount}</p>
                        <p>GST_amount: {product.GST_amount}</p>
                        <p>includingGST_amount: {product.includingGST_amount}</p>
                        <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
