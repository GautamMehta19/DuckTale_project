import React, { useState } from 'react';
import axios from 'axios';

const ProductCreatePage = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [discountedAmount, setDiscountedAmount] = useState('');
    const [GSTAmount, setGSTAmount] = useState('');
    const [includingGSTAmount, setIncludingGSTAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/createProduct', {
                productName,
                price,
                couponCode,
                discount,
                discountedAmount,
                GSTAmount,
                includingGSTAmount
            });
            if (response.status === 201) {
                alert(response.data.message)
                setProductName('');
                setPrice('');
                setCouponCode('');
                setDiscount('');
                setDiscountedAmount('');
                setGSTAmount('');
                setIncludingGSTAmount('');
                // Optionally, reset form fields
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert(error.response.data.message)

        }
    };

    return (
        <div>
            <h2>Create Product</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Product created successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Coupon Code:</label>
                    <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                </div>
                <div>
                    <label>Discount:</label>
                    <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div>
                    <label>Discounted Amount:</label>
                    <input type="number" value={discountedAmount} onChange={(e) => setDiscountedAmount(e.target.value)} />
                </div>
                <div>
                    <label>GST Amount:</label>
                    <input type="number" value={GSTAmount} onChange={(e) => setGSTAmount(e.target.value)} />
                </div>
                <div>
                    <label>Including GST Amount:</label>
                    <input type="number" value={includingGSTAmount} onChange={(e) => setIncludingGSTAmount(e.target.value)} />
                </div>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default ProductCreatePage;
