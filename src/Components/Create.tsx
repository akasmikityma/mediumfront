import  { useState } from 'react'
import { CreatePostType } from '@bishal_maity/common'
import { BsThreeDots } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import LoaderComp from './Loader';

const Create = () => {
    const navigate=useNavigate();
    const [loading,setloading]=useState(false);
    const [inputs,setInputs]=useState<CreatePostType>({
        title:"",
        content:""
     }) 
     
     const sendPostcall=async()=>{
        console.log(inputs,localStorage.getItem("jwt"))
        setloading(true)
        const response =await axios.post(`https://backend.akasmik123.workers.dev/api/v1/book`,inputs,{
            headers:{
                Authorization:localStorage.getItem("jwt")
            }
        })
        if(!response.data.id){
            alert(`some error has occured`)
        }
        setloading(false);
        navigate('/blogs')
     }
    
     return (
        <div className='p-10 h-screen'>
            {loading ? (
                <LoaderComp />
            ) : (
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center justify-center'>
                            <h3 className='font-bold text-2xl'>bloG</h3>
                            <h3 className='text-sm'>draft</h3>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <button className='px-3 py-1 rounded-full bg-green-600 text-white' onClick={sendPostcall}>Publish</button>
                            <BsThreeDots />
                            <FaBell />
                        </div>
                    </div>
                    <div className='flex flex-row mt-8 p-10 gap-2 h-full'>
                        <FaPlus />
                        <div className='flex flex-col gap-3 w-full'>
                            <input
                                type="text"
                                placeholder='Title'
                                className='w-full h-12 text-3xl outline-none'
                                defaultValue={inputs.title}
                                onChange={(e) => {
                                    setInputs({ ...inputs, title: e.target.value });
                                }}
                            />
                            <textarea
                                className='h-full p-2 mt-3 outline-none text-lg'
                                placeholder='Tell Your Story'
                                defaultValue={inputs.content}
                                onChange={(e) => {
                                    setInputs({ ...inputs, content: e.target.value });
                                }}
                            ></textarea>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Create

//a header like Comp that has some gibberish at the left and some at the right like publish that actually triggers the request 