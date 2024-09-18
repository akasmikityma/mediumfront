import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { blogType } from './Blogs'
import axios from 'axios'
const Blog = () => {
    const [data,setData]=useState<blogType>()
    console.log(`this is the Bolgs Page`)
    const {id}=useParams();
    useEffect(()=>{
      const getBlogbyId=async()=>{
        const response =await axios.get(`https://backend.akasmik123.workers.dev/api/v1/book/${id}`,{
          headers:{
            Authorization:localStorage.getItem("jwt")
          }
        })
        console.log(response.data)
        setData(response.data)
      }

      getBlogbyId()
    },[])
    return (
      <div className='p-8'>
        <div className='h-screen grid grid-cpls-2 lg:grid-cols-3 p-5'>
          <div className='col-span-2 p-8'>
            <h1 className='text-5xl font-extrabold'>{data?.title}</h1>
            <p className='font-light my-6'>{data?.published}</p>
            <p className='text-lg'>{data?.content}</p>
  
          </div>
          <div className='col-span-1 p-8 flex-col hidden lg:block'>
            <h4>author</h4>
            <div className='flex flex-row justify-center items-center gap-3'>
              <div className='border rounded-full bg-slate-200 w-28 h-8 '></div>
             <div>
             <h2 className='text-3xl font-extrabold'>Jokester</h2>
             <p>{data?.authorId}</p>
             </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Blog

// have a div p-3 and grid that div two one having 2/3 and the other having the rest space left and then 