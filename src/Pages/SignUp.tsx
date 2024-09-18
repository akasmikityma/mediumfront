import React, { ChangeEvent,useState } from 'react'
import { SignupType } from '@bishal_maity/common'
const SignUp = () => {
    const [postInputs, setpostInputs] = useState<SignupType>({
        name:"",
        email:"",
        password:""
    })
  return (
    <div className='grid  grid-cols-1 lg:grid-cols-2 justify-center items-center'>
        <div className='flex justify-center items-center flex-col h-screen'>
            <h3 className='font-bold'>Create an Account</h3>
            <div className='flex flex-row gap-1'>
            <p className='text-sm font-light'>already have an account?</p>
            <span className='text-md font-light underline'>login</span>
            </div>
            <div className='mt-3 w-2/3'>
            {/* <InputField label='username'type='text' onchange={(e)=>{
               setpostInputs(()=>{
               
                
               })
            }}/>
            <InputField label='email'type='email'/>
            <InputField label='password'type='password'/> */}
            </div>
        </div>
        <div className='hidden lg:block'>
            <Qoute/>
        </div>
    </div>
  )
}
interface inputType{
    label:string,
    type:string,
    onchange:(e:ChangeEvent<HTMLInputElement>)=>void
}
const InputField=({label,type,onchange}:inputType)=>{
    return (
        <div className='mt-2 p-3'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="John" required  onChange={onchange}/>
        </div>
    )
}
const Qoute=()=>{
    return (
        <div className='h-screen bg-slate-200 flex justify-center items-center'>
            <div className='p-5 w-2/3'>
                <h3 className='font-bold text-lg'>" a platform where stories come to life. Whether you're a seasoned writer or just starting, share your unique perspectives with a global audience and engage in meaningful conversations. Discover inspiring content, connect with like-minded individuals, and make your voice heard"</h3>
                <h4 className='font-semibold mt-3'>bisahl</h4>
                <p>baler ceo</p>
            </div>
        </div>
    )
}
export default SignUp

//username,email,password>>