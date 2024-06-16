import React, { useState } from 'react'
import { CreatePostType } from '@bishal_maity/common'
import { BsThreeDots } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate=useNavigate();
    const [inputs,setInputs]=useState<CreatePostType>({
        title:"",
        content:""
     }) 
     
     const sendPostcall=async()=>{
        console.log(inputs,localStorage.getItem("jwt"))
        const response =await axios.post(`https://backend.akasmik123.workers.dev/api/v1/book`,inputs,{
            headers:{
                Authorization:localStorage.getItem("jwt")
            }
        })
        if(!response.data.id){
            alert(`some error has occured`)
        }
        setTimeout(()=>{
            navigate('/blogs')
            alert(`an post has been create with the id ${response.data.id}`)
        },3000)
     }
  return (
    <div className='p-5 h-screen'>
        <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
            <h3 className='font-bold text-xl'>Draft in Kirags</h3>
            <h3>Saved</h3>
            </div>
            <div className='flex gap-4 items-center'>
                <button className='px-3 py-1 rounded-full bg-green-600 text-white' onClick={sendPostcall}>publish</button>
                <BsThreeDots/>
                <FaBell/>
            </div>
        </div>
        <div className='flex flex-row r  mt-8  p-10 gap-2 h-full'>
            <FaPlus/>
            <div className='flex flex-col gap-3  w-full'>
            <input type="text" placeholder='Title' className='w-full h-12 text-3xl outline-none' defaultValue={inputs.title} onChange={(e)=>{
                setInputs({...inputs,title:e.target.value})
            }}/>
            <textarea name="" id="" className='h-full p-2 mt-3 outline-none text-lg' placeholder='Tell Your Story' defaultValue={inputs.content} 
            onChange={(e)=>{
                setInputs({...inputs,content:e.target.value})
            }}></textarea>
            </div>
        </div>
    </div>
  )
}

export default Create

//a header like Comp that has some gibberish at the left and some at the right like publish that actually triggers the request 