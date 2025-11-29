import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signInUser} = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    console.log("location from login:",location)

    const handleLogin = (data) => {
        console.log("login:", data);
        signInUser(data.email,data.password)
        .then(result => {
            console.log("Successful login:",result.user)
            navigate(location.state || '/')
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body pb-0" onSubmit={handleSubmit(handleLogin)}>
                <h1 className='text-3xl font-semibold text-center'>Welcome Back</h1>
                <p className='text-center'>Login with ZapShift</p>
                <fieldset className="fieldset ">
                    <label className="label">Email</label>
                    <input type="email" {...register('email',{required: true})} className="input" placeholder="Email" />
                    {
                        errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>
                    }

                    <label className="label">Password</label>
                    <input type="password" {...register('password',{required: true,minLength: 6})} className="input" placeholder="Password" />
                    {
                        errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6 characters</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>Don’t have any account? <Link to="/register" state={location.state} className='text-blue-600 underline'>Register</Link> </p>
                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;