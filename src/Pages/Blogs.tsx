import { blogsState } from '../store/helper';

import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import Blog from './Blog';

import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import LoaderComp from '../Components/Loader';

export interface blogType {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

const Blogs = () => {
  // const [blogs, setBlogs] = useState<blogType[]>([]);
  const [blogs,setBlogs]=useRecoilState<blogType[]>(blogsState)
  const [loading,setLoading]=useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://backend.akasmik123.workers.dev/api/v1/book/getAll', {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      });

      if (response.data.posts) {
        setBlogs(response.data.posts);
        setIsFetched(true);
        setLoading(false);
      } else {
        alert('Data not fetched');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('An error occurred while fetching data');
    }
  }, []);

  useEffect(() => {
    if (!isFetched || deleteClicked) {
      fetchBlogs();
    }
  }, [deleteClicked,blogs]);
 if(loading){
  return (
    <div className='flex h-screen justify-center'>
      <LoaderComp/>
    </div>
  )
 }
  return (
    <div className=''>
      <div className='px-12 '>
        <div className='flex flex-row items-center gap-3'>
          <Link to={'/create'}>
            <FaPlus />
          </Link>
          <h1>For You</h1>
          <h1>Following</h1>
        </div>
      </div>
      <div>
        {blogs &&
          blogs.map((blog) => {
            if (blog.id) {
              return <BlogCell key={blog.id} blog={blog} setDeleteClicked={setDeleteClicked} />;
            } else {
              console.error('Blog item missing id:', blog);
              return null;
            }
          })}
      </div>
    </div>
  );
};

interface BlogProps {
  blog: blogType;
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogCell = ({ blog, setDeleteClicked }: BlogProps) => {
  const navigate=useNavigate()
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`https://backend.akasmik123.workers.dev/api/v1/book/del`, {
        data: { id: id },
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      });

      if (!response.data.msg) {
        alert(`Some error occurred while deleting the post`);
      } else {
        alert(`The deletion completed ${id}`);
        setDeleteClicked((prev) => !prev);
      }
    } catch (error) {
      console.error('Error deleting the post:', error);
      alert('An error occurred while deleting the post');
    }
  };
 const editHandler=(id:string)=>{
  navigate(`/update/${id}`)
 }
  return (
    <div className='grid grid-cols-3 p-8 w-full h-1/3'>
      <div className='col-span-2 p-5'>
        <div>{`${blog.authorId.slice(0, 10)} Dec 3-2023`}</div>
        <div>
          <Link to={`/blog/${blog.id}`}>
            <h2 className='font-extrabold text-3xl'>{blog.title}</h2>
          </Link>
          <p>{`${blog.content} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, ad? Rerum nisi libero quis magnam corrupti aliquid aut illum nobis.`}</p>
          <div className='flex mt-3 gap-3'>
            <RiDeleteBin5Fill onClick={() => handleDelete(blog.id)} />
            <FaEdit onClick={()=>editHandler(blog.id)}/>
          </div>
        </div>
      </div>
      <div className='col-span-1 p-5 '>
        <img className='w-1/2 p-5' src='https://bunnyacademy.b-cdn.net/what-is-docker.png' alt='' />
      </div>
    </div>
  );
};

export default Blogs;
