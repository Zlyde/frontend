import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    /* const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, setError } = useMessage();
    const { connectSocket } = useSocket();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'https://jsramverk-editor-tesi23-beh7hvfadub6fugk.northeurope-01.azurewebsites.net/login';
        const userData = { email, password };

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userData),
            };
            const response = await fetch(url, requestOptions);
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.data.token);
                connectSocket(data.data.token);
                navigate('/documents');
            } else {
                setError('Failed to login. Please try again');
            }
        } catch (error) {
            setError('Failed to login. Please try again');
            console.error(error);
        }
    }; */

    return (
        <div>
            <h1>Login</h1>
                <p>Please log in to access the system.</p>
        </div>
    );
};

export default LoginPage;
