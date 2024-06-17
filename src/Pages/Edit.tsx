import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UpdatePostType } from '@bishal_maity/common';
import axios from 'axios';
import LoaderComp from '../Components/Loader';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { CgEnter } from 'react-icons/cg';
import { blogType } from './Blogs';
import { useRecoilValue } from 'recoil';
import { getsingleBlog } from '../store/helper';
const Edit = ({existingData}:{existingData:blogType}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedBlog=useRecoilValue(getsingleBlog(id))
  console.log(selectedBlog)
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<UpdatePostType>({
    title: selectedBlog?.title,
    content: selectedBlog?.content,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // or 'error'
  });

  const updateHandler = async () => {
    let token = localStorage.getItem('jwt');
    if (token && !token.startsWith('Bearer ')) {
      token = `Bearer ${token}`;
    }
    const headers = { Authorization: token };

    try {
      setLoading(true);
      const response = await axios.put(
        `https://backend.akasmik123.workers.dev/api/v1/book`,
        { id, title: inputs.title, content: inputs.content },
        { headers }
      );
      setLoading(false);
      if (response.data) {
        setSnackbar({
          open: true,
          message: 'Post updated successfully!',
          severity: 'success',
        });
        setTimeout(() => navigate('/blogs'), 3000); // Navigate after 3 seconds
      } else {
        setSnackbar({
          open: true,
          message: 'Some error occurred. Please try again.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'An error occurred. Please check the console for details.',
        severity: 'error',
      });
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  useEffect(() => {
    if (!selectedBlog) {
      alert(`this very blog is not available`)
    }
  }, [selectedBlog]);

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <LoaderComp />
      </div>
    );
  }

  return (
    <div className='p-5 h-screen'>
      <div className='flex flex-row r mt-8 p-10 gap-2 h-full'>
        <div className='flex flex-col gap-3 w-full'>
          <input
            type='text'
            placeholder='Title'
            className='w-full h-12 text-3xl outline-none'
            defaultValue={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
          <textarea
            name=''
            id=''
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
      <div className=''>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000} // Set to 3 seconds
          onClose={handleClose}
        >
          <SnackbarContent
            message={snackbar.message}
            className={`fixed top-0 right-0 p-4 ${
              snackbar.severity === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          />
        </Snackbar>
      </div>
    </div>
  );
};

export default Edit;
