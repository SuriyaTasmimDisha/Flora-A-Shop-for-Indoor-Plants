import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../../Components/LoadingBox';
import MessageBox from '../../Components/MessageBox';
import { login } from '../../Store/Actions/UserActions'
import { makeStyles } from '@material-ui/core/styles';

export default function Login(props) {
    
    const [email, setEmail] =useState('');
    const [password, setPassword] =  useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading, error } = userLogin; 

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1> Login </h1>
                    <div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant='danger'>{error}</MessageBox>}
                    </div>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                    type='email'
                    id='email'
                    placeholder='Enter Email'
                    required
                    onChange={ (e) => setEmail(e.target.value)}
                     />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                    type='password'
                    id='password'
                    placeholder='Enter Password'
                    required
                    onChange={ (e) => setPassword(e.target.value)}
                     />
                </div>
                <div>
                    <label />
                    <button className='block' type='submit'>
                        Login
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
