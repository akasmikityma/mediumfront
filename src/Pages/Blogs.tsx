// import { blogsState } from '../store/helper';

// import axios from 'axios';
// import React, { useEffect, useState, useCallback } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import Blog from './Blog';

// import { RiDeleteBin5Fill } from 'react-icons/ri';
// import { FaEdit } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
// import Snackbar from '@mui/material/Snackbar';
// import SnackbarContent from '@mui/material/SnackbarContent';
// import LoaderComp from '../Components/Loader';

// export interface blogType {
//   id: string;
//   title: string;
//   content: string;
//   published: boolean;
//   authorId: string;
//   createdAt: string,
//   author: {
//      name: null
//         }
// }

// const Blogs = () => {
//   // const [blogs, setBlogs] = useState<blogType[]>([]);
//   const [blogs,setBlogs]=useRecoilState<blogType[]>(blogsState)
//   const [loading,setLoading]=useState(false);
//   const [isFetched, setIsFetched] = useState(false);
//   const [deleteClicked, setDeleteClicked] = useState(false);
  

//   const fetchBlogs = useCallback(async () => {
//     try {
//       setLoading(true)
//       const response = await axios.get('http://127.0.0.1:8787/api/v1/book/getAll', {
//         headers: {
//           Authorization: localStorage.getItem('jwt'),
//         },
//       });
//       setLoading(false);
//       if (response.data.posts) {
//         console.log(response.data.posts)
//         setBlogs(response.data.posts);
//         setIsFetched(true);
        
//       } else {
//         alert('Data not fetched');
//       }
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//       alert('An error occurred while fetching data');
//     }
//   }, []);

//   useEffect(() => {
//     if (!isFetched || deleteClicked) {
//       fetchBlogs();
//     }
//   }, [deleteClicked,blogs]);
// //  if(loading){
// //   return (
// //     <div className='flex h-screen justify-center'>
// //       <LoaderComp/>
// //     </div>
// //   )
// //  }
//   return (
//     <div className=' p-6'>
//       <div className='px-12 '>
//         <div className='flex flex-row items-center gap-3'>
//           <Link to={'/create'}>
//             <FaPlus />
//           </Link>
//           <h1>For You</h1>
//           <h1>Following</h1>
//         </div>
//       </div>
//       <div>
//         {blogs &&
//           blogs.map((blog) => {
//             if (blog.id) {
//               return <BlogCell key={blog.id} blog={blog} setDeleteClicked={setDeleteClicked} />;
//             } else {
//               console.error('Blog item missing id:', blog);
//               return null;
//             }
//           })}
//       </div>
//     </div>
//   );
// };

// interface BlogProps {
//   blog: blogType;
//   setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const BlogCell = ({ blog, setDeleteClicked }: BlogProps) => {
//   console.log(blog)
//   const navigate=useNavigate()
//   const [snackbar,setsnackbar]=useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   })

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await axios.delete(`http://127.0.0.1:8787/api/v1/book/del`, {
//         data: { id: id },
//         headers: {
//           Authorization: localStorage.getItem('jwt'),
//         },
//       });

//       if (!response.data.msg) {
//         setsnackbar({ open: true, message: 'Some error occurred while deleting the post', severity: 'error' });
//       } else {
//         setsnackbar({ open: true, message: 'Post deleted successfully!', severity: 'success' });
//         setDeleteClicked((prev) => !prev); // Trigger refetch on successful deletion
//       }
//     } catch (error) {
//       console.error('Error deleting the post:', error);
//       alert('An error occurred while deleting the post');
//     }
//   };
//   const handleClose = () => {
//     setsnackbar({ ...snackbar, open: false });
//   };
//  const editHandler=(id:string)=>{
//   navigate(`/update/${id}`)
//  }
//   return (
//     <div className='grid grid-cols-3 p-8 w-full h-1/3 '>
//       <div className='col-span-2 p-5'>
//         <div>{`${blog.author.name!==null?blog.author.name:blog.authorId.slice(0, 10)} ${new Date(blog.createdAt).toLocaleDateString('en-IN')}`}</div>
//         <div>
//           <Link to={`/blog/${blog.id}`}>
//             <h2 className='font-extrabold text-xl md:text-2xl lg:text-3xl'>{blog.title}</h2>
//           </Link>
//           <p>{blog.content}</p>
//           <div className='flex mt-3 gap-3'>
//             <RiDeleteBin5Fill onClick={() => handleDelete(blog.id)} />
//             <FaEdit onClick={()=>editHandler(blog.id)}/>
//           </div>
//         </div>
//       </div>
//       {/* <div className='col-span-1 p-5  flex justify-center'>
//         <img className='w-1/2 p-5' src='https://bunnyacademy.b-cdn.net/what-is-docker.png' alt='' />
//       </div> */}
//       <div className=''>
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000} // Set to 3 seconds
//           onClose={handleClose}
//         >
//           <SnackbarContent
//             message={snackbar.message}
//             className={`fixed top-0 right-0 p-4 ${
//               snackbar.severity === 'success' ? 'bg-green-500' : 'bg-red-500'
//             } text-white`}
//           />
//         </Snackbar>
//       </div>
//     </div>
//   );
// };

// export default Blogs;
import { blogsState } from '../store/helper';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import Blog from './Blog';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import LoaderComp from '../Components/Loader';
import { toast } from 'react-toastify';

export interface blogType {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  author: {
    name: string | null;
  };
}

const Blogs = () => {
  const [blogs, setBlogs] = useRecoilState<blogType[]>(blogsState);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [dataChanged, setDataChanged] = useState(false); // Track any change in data

  // Fetch blogs from the server
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://backend.akasmik123.workers.dev/api/v1/book/getAll', {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      });
      setLoading(false);
      if (response.data.posts) {
        setBlogs(response.data.posts);
        setIsFetched(true);
        setDataChanged(false); // Reset after fetching
      } else {
        alert('Data not fetched');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('An error occurred while fetching data');
    }
  }, []);

  // Fetch blogs whenever data changes (e.g., post created, deleted)
  useEffect(() => {
    if (!isFetched || dataChanged) {
      fetchBlogs();
    }
  }, [dataChanged, fetchBlogs]);

  // Call this after creating a post to trigger refetch
  const handlePostCreated = () => {
    setDataChanged(true); // Trigger refetch when a post is created
  };

  return (
    <div className="p-6">
      <div className="px-12">
        <div className="flex flex-row items-center gap-3">
          <Link to={'/create'} onClick={handlePostCreated}>
            <FaPlus />
          </Link>
          <h1>For You</h1>
          <h1>Following</h1>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="flex h-screen justify-center">
            <LoaderComp />
          </div>
        ) : (
          blogs &&
          blogs.map((blog) => {
            if (blog.id) {
              return (
                <BlogCell key={blog.id} blog={blog} setDataChanged={setDataChanged} />
              );
            } else {
              console.error('Blog item missing id:', blog);
              return null;
            }
          })
        )}
      </div>
    </div>
  );
};

interface BlogProps {
  blog: blogType;
  setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogCell = ({ blog, setDataChanged }: BlogProps) => {
  const navigate = useNavigate();
  const [snackbar, setsnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Delete blog post
  const handleDelete = async (id: string) => {
    console.log(`delete button clicked`)
    try {
      const response = await axios.delete(`https://backend.akasmik123.workers.dev/api/v1/book/del`, {
        data: { id: id },
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      });
  console.log(response.data)
    
      if (response.status === 200) {
        toast.success(response.data.msg);
        setDataChanged(true); 
      } 
       
      else if (response.status === 403) {
        toast.error(response.data.msg);  
      }
    } catch (error:any) {
      if (error.response?.status === 403) {
        toast.error(error.response.data.msg);  
      } else {
        toast.error('An error occurred while deleting the post');  
      }
      console.error('Error deleting the post:', error);
    }
  };
  

  const handleClose = () => {
    setsnackbar({ ...snackbar, open: false });
  };

  const editHandler = (id: string) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="grid grid-cols-3 p-8 w-full h-1/3  mt-4 hover:bg-teal-50 transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="col-span-2 p-5">
        <div>{`${blog.author.name !== null ? blog.author.name : blog.authorId.slice(0, 10)} ${new Date(blog.createdAt).toLocaleDateString('en-IN')}`}</div>
        <div>
          <Link to={`/blog/${blog.id}`}>
            <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl font-serif">{blog.title}</h2>
          </Link>
          <p>{blog.content}</p>
          <div className="flex mt-3 gap-3">
            <RiDeleteBin5Fill onClick={() => handleDelete(blog.id)} className='cursor-pointer text-red-700'size={20} />
            <FaEdit onClick={() => editHandler(blog.id)} className='cursor-pointer text-yellow-600'size={20}/>
          </div>
        </div>
      </div>
      <div className="">
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

export default Blogs;
