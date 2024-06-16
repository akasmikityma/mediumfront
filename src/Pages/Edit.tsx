import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UpdatePostType } from '@bishal_maity/common';
import axios from 'axios';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState<UpdatePostType>({
    title: "",
    content: "",
  });

  const updateHandler = async () => {
    let token = localStorage.getItem('jwt');
    if (token && !token.startsWith('Bearer ')) {
        token = `Bearer ${token}`;
    }
    const headers = { Authorization: token };
    console.log(headers);
    
    try {
        const response = await axios.put(
            `https://backend.akasmik123.workers.dev/api/v1/book`,
            { id, title: inputs.title, content: inputs.content }, // Data to be sent in the body
            { headers } // Headers should be a separate parameter
        );
        console.log(response.data)
        if (response.data) {
            alert('Post updated successfully!');
            navigate('/blogs'); // or redirect to a success page
        } else {
            alert('Some error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        alert('An error occurred. Please check the console for details.');
    }
};

  return (
    <div className='p-5 h-screen'>
      <div className='flex flex-row r mt-8 p-10 gap-2 h-full'>
        <div className='flex flex-col gap-3 w-full'>
          <input
            type="text"
            placeholder='Title'
            className='w-full h-12 text-3xl outline-none'
            defaultValue={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
          <textarea
            name=""
            id=""
            className='h-full p-2 mt-3 outline-none text-lg'
            placeholder='Tell Your Story'
            defaultValue={inputs.content}
            onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
          />
          <button className='px-4 py-2 bg-yellow-200 text-black' onClick={updateHandler}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
