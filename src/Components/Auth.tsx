import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupType, SigninType } from '@bishal_maity/common';
import axios from 'axios';
import { toast } from 'react-toastify';
const Auth = ({ type }: { type: "signUp" | "signin" }) => {
    const [inputs, setInputs] = React.useState<SignupType | SigninType>(
        type === "signUp"
            ? { name: "", email: "", password: "" }
            : { email: "", password: "" }
    );

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = () => {
        navigate(type === "signUp" ? '/signin' : '/signup');
    };
   const handleButton=async()=>{
       const response =await axios.post(`https://backend.akasmik123.workers.dev/api/v1/user/${type==="signUp"?"signup":"signin"}`,inputs);
       console.log(response.data)
       if(response.status===200){
        localStorage.setItem("jwt",`Bearer ${response.data.jwt}`)
        toast('Welcome back')
        navigate("/blogs")
       }
       //it just gives a jwt back .. 
   }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center'>
            <div className='flex justify-center items-center flex-col h-screen'>
                <h3 className='font-bold'>
                    {type === "signUp" ? "Create an Account" : "Sign In"}
                </h3>
                <div className='flex flex-row gap-1'>
                    <p className='text-sm font-light'>
                        {type === "signUp" ? "Already have an account?" : "Don't have an account?"}
                    </p>
                    <span className='text-md font-light underline cursor-pointer' onClick={handleToggle}>
                        {type === "signUp" ? "Login" : "Sign Up"}
                    </span>
                </div>
                <div className='mt-3 w-2/3'>
                    {type === "signUp" && (
                        <InputField
                            label='Username'
                            type='text'
                            name='name'
                            value={(inputs as SignupType).name ?? ""}
                            onchange={handleChange}
                        />
                    )}
                    <InputField
                        label='Email'
                        type='email'
                        name='email'
                        value={inputs.email}
                        onchange={handleChange}
                    />
                    <InputField
                        label='Password'
                        type='password'
                        name='password'
                        value={inputs.password}
                        onchange={handleChange}
                    />
                   <div className='px-3'>
                   <button className='p-2 bg-slate-900 text-white w-full mt-5' onClick={handleButton}>submit</button>
                   </div>
                </div>  
                
            </div>
            <div className='hidden lg:block'>
                <Quote />
            </div>
        </div>
    );
};

interface InputType {
    label: string;
    type: string;
    name: string;
    value: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type, name, value, onchange }: InputType) => {
    return (
        <div className='mt-2 p-3'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`Enter your ${label.toLowerCase()}`}
                required
                onChange={onchange}
            />
        </div>
    );
};

const Quote = () => {
    return (
        <div className='h-screen bg-slate-200 flex justify-center items-center'>
            <div className='p-5 w-2/3'>
                <h3 className='font-bold text-lg'>
                    " a platform where stories come to life. Whether you're a seasoned writer or just starting, share your unique perspectives with a global audience and engage in meaningful conversations. Discover inspiring content, connect with like-minded individuals, and make your voice heard"
                </h3>
                <h4 className='font-semibold mt-3'>- Bishal</h4>
                <p className='font-extralight'>bloG user</p>
            </div>
        </div>
    );
};

export default Auth;
