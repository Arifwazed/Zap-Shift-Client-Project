import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const {register,handleSubmit,formState: { errors }} = useForm();
    const {registerUser,updateUserProfile} = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    console.log("location from register :",location)

    const axiosSecure = useAxiosSecure();

    const handleRegister = (data) => {
        console.log("after register: ",data)
        const profileImg = data.photo[0];
        registerUser(data.email,data.password)
        .then(result => {
            console.log(result.user)
            // store the image and get photo url
            const formData = new FormData();
            formData.append('image',profileImg)

            const image_API_URL  = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            axios.post(image_API_URL,formData)
            .then(res => {
                // console.log('after image upload',res.data.data.url)
                
                // create user in the database
                const photoURL = res.data.data.url;
                const userInfo = {
                    displayName: data.name,
                    email: data.email,
                    photoURL: photoURL,
                }
                axiosSecure.post('/users',userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('new user added to database')
                    }
                })

                // update user profile to firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: res.data.data.url
                }
                updateUserProfile(userProfile)
                .then( () => {
                    console.log('user updated done')
                    navigate(location.state ||'/');
                })
                .catch(error => {
                    console.log(error)
                })
            })
        })
        .catch(error => {
            console.log(error)
        }
        )
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body pb-0" onSubmit={handleSubmit(handleRegister)}>
                {/* <div className="card-body"> */}
                <h1 className='text-3xl font-semibold text-center'>Create an Account</h1>
                <p className='text-center'>Register with ZapShift</p>
                <fieldset className="fieldset">
                    {/* Name */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name',{required: true})} className="input" placeholder="Name" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>
                    }
                    {/* Photo */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo',{required: true})} className="file-input" placeholder="Photo" />
                    {
                        errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required</p>
                    }
                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email',{required: true})} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }
                    {/* Password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password',{required: true,minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$/})} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be six character</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have one uppercase letter, one lower case letter and one special character</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                    <p>Already have an account?  <Link to="/login" state={location.state} className='text-blue-600 underline'>Login</Link> </p>
                </fieldset>
                {/* </div> */}
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;