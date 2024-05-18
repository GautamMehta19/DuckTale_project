import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CartList = () => {
    const location = useLocation();
    const cartList = location.state?.cartList.data;
    const userData = location.state.userData;
    const [items, setItems] = useState(cartList?.items);
    const [totalItems, setTotalItems] = useState(cartList?.totalItems);
    const [totalPrice, setTotalPrice] = useState(cartList?.totalPrice);
    const navigate = useNavigate();
    const [couponCodes, setCouponCodes] = useState({})

    if (!cartList) {
        return <p>No items in cart</p>;
    }
    // const products = items.map(item => (
    //     <div key={item._id}>
    //         <p>Product Id: {item.productId._id}</p>
    //         <p>Product Name: {item.productId.productName}</p>
    //         <p>includingGST_amount: {item.productId.includingGST_amount}</p>
    //         <p>Quantity: {item.productQuantity}</p>
    //         <button onClick={() => handleIncreaseQuantity(item.productId._id)}>Increase Quantity</button>
    //         <button onClick={() => handleDecreaseQuantity(item.productId._id)}>Decrease Quantity</button>
    //         <button>Remove from Cart</button>
    //     </div>
    // ));

    const handleIncreaseQuantity = async (productId) => {
        const response = await axios.patch(`http://localhost:4000/increaseTheProductCount/${cartList.userId}/${productId}`);

        if (response.status === 200) {

            const cartResponse = await axios.get(`http://localhost:4000/getCart/${cartList.userId}`);

            const updatedItems = cartResponse.data.data.items.map(item => {
                if (item.productId._id === productId) {
                    return { ...item, productQuantity: item.productQuantity };
                }
                return item;
            });
            setItems(updatedItems);
            setTotalItems(cartResponse.data.data.totalItems);
            setTotalPrice(cartResponse.data.data.totalPrice);

        } else {
            // Handle other status codes or errors if needed
            console.error('Failed to increase quantity:', response.data.message);
        }
    };

    const handleDecreaseQuantity = async (productId) => {
        const response = await axios.patch(`http://localhost:4000/decreaseTheProductCount/${cartList.userId}/${productId}`);

        if (response.status === 200) {

            const cartResponse = await axios.get(`http://localhost:4000/getCart/${cartList.userId}`);

            const updatedItems = cartResponse.data.data.items.map(item => {
                if (item.productId._id === productId) {
                    return { ...item, productQuantity: item.productQuantity };
                }
                return item;
            });
            setItems(updatedItems);
            setTotalItems(cartResponse.data.data.totalItems);
            setTotalPrice(cartResponse.data.data.totalPrice);

        } else {
            // Handle other status codes or errors if needed
            console.error('Failed to increase quantity:', response.data.message);
        }
    };

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

    const handleRemoveCart = async (productId) => {
        const response = await axios.put(`http://localhost:4000/removeFromCart/${cartList.userId}/${productId}`);

        if (response.status === 200) {

            const cartResponse = await axios.get(`http://localhost:4000/getCart/${cartList.userId}`);

            const updatedItems = cartResponse.data.data.items.map(item => {
                if (item.productId._id === productId) {
                    return { ...item, productQuantity: item.productQuantity };
                }
                return item;
            });
            setItems(updatedItems);
            setTotalItems(cartResponse.data.data.totalItems);
            setTotalPrice(cartResponse.data.data.totalPrice);

        } else {
            // Handle other status codes or errors if needed
            console.error('Failed to remove to cart:', response.data.message);
        }
    };

    const applyCoupon = async (productId, couponCode) => {
        try {
            const response = await axios.get(`http://localhost:4000/applyCoupon/${cartList.userId}/${productId}/?couponCode=${couponCode}`);
            console.log("cou", response.data.message)
            if (response.status === 200) {
                // setItems(cartList.length);
                setTotalPrice(cartList.totalPrice - response.data.data);
                alert('Coupon applied successfully!');
            } else {
                alert('Failed to apply coupon');
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            alert(error.response.data.message);
        }
    };

    const handleCouponCodeChange = (productId, couponCode) => {
        setCouponCodes(prevState => ({
            ...prevState,
            [productId]: couponCode // Update the coupon code for the corresponding product ID
        }));
    }


    return (
        <div>
            <h1>Cart Items</h1>
            <button onClick={handleSubmit}>Go To Product Section</button>
            <h2>total items added- {totalItems}</h2>
            <h2>total amount - {totalPrice}</h2>
            {items.map(item => (
                <div key={item._id}>
                    <p>Product Id: {item.productId._id}</p>
                    <p>Product Name: {item.productId.productName}</p>
                    <p>includingGST_amount: {item.productId.includingGST_amount}</p>
                    <p>productPrice: {item.productPrice}</p>
                    <p>Quantity: {item.productQuantity}</p>
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCodes[item.productId._id] || ''}
                        onChange={(e) => handleCouponCodeChange(item.productId._id, e.target.value)}
                    />
                    <button onClick={() => applyCoupon(item.productId._id, couponCodes[item.productId._id])}>Apply Coupon</button><br></br>
                    <button onClick={() => handleIncreaseQuantity(item.productId._id)}>Increase Quantity</button>
                    <button onClick={() => handleDecreaseQuantity(item.productId._id)}>Decrease Quantity</button>
                    <button onClick={() => handleRemoveCart(item.productId._id)}>Remove from Cart</button>
                </div>
            ))}
        </div>
    );
};

export default CartList;
