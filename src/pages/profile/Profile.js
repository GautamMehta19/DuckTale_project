import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom';

const Profile = () => {

    //   let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    //   let [isChanged, setIsChanged] = useState(false)

    const [userData, setUserData] = useState({
        name: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate  = useNavigate ();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/registerAndLogin', userData)

            if (response.status === 201 || response.status === 200) {
                const userData = response.data.data; 
                navigate(`/userDetails/${response.data.data._id}`, { state: { userData } });
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    return (
        <div className="profile-section">
            <h2>Register And Login Page</h2>
            <div className='profile-register-login'>
                <input type='text' name='name' placeholder='Full Name' value={userData.name} onChange={handleInputChange} />
                <input type='text' name='address' placeholder='Address' value={userData.address} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}>Register And Login</button>
        </div>
    )
}

export default Profile