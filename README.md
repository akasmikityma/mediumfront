# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

##  auth ==> 

   1> only logged in users are able to get the posts that the app has to offer and then .. it has the functionality to post a new post by creating at the CreatePost page and then >> 

   do i show the users post on the same page as the page where the other users post are listed or not>>>>

   ==>> he made Auth as the cell of the body >> so he made Auth in a way that a type string can be Passed and then 
   wrote 2 more Comps -SignUP , SignIN and called the Auth Comp there giving the type according to the comp > 

   Pages __________>> [All_these_routes_are_protected]
   
   1 > all the Posts Containing Page 
   2 > single Post's elaborative page 
   3 > write A post page 


   blog page is different .. it cant be the cell for the blogs comp  >>>>
   

   only 2 things left more or less +++>>>>

   Updation of a post ==
   Deletion of a Post ==

   deletion -- i can give a button icon in the cell post and then add a method there 

   updation can be another page thing kind of same as the the Create Post page and the clicking some button may get the job done>>


   tasks --> 
    have a loader comp and utilize the loader atom whenever the task is taking some time >

    have some nice notifications that tells the user .. what happened to the event they did>>

    {what if i delete the posts locally untill the user refreshes the page .. it can be faster in rendering the remaining posts that are left there>>} 

    probable positions to use the loader comp 
    - signIN/signUP
    - creating a post
    - deleting one / updating 
    - home page fetching all the blogs [done] 

    -----== Issues>>
    1 .the loader is running unnecessarily when the user comes back from another page ..especially from the update page ..
    ** with out this rendering  seems to be faster 
   
    2. Clicking on the update button must get me the page to update post but with the existing material that the post has >> so that only the needed parts get updated
       not like the whole thing has to be written again >>

    


<!-- 
    ---------------------------------------

    import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UpdatePostType } from '@bishal_maity/common';
import axios from 'axios';
import LoaderComp from '../Components/Loader';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<UpdatePostType>({
    title: '',
    content: '',
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
        navigate(`/blogs?message=Post updated successfully!&severity=success`);
      } else {
        navigate(`/blogs?message=Some error occurred. Please try again.&severity=error`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setLoading(false);
      navigate(`/blogs?message=An error occurred. Please check the console for details.&severity=error`);
    }
  };

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
    </div>
  );
};

export default Edit;
Blogs Component
Now, in the component where you want to display the notification (e.g., Blogs component), retrieve the URL parameters and display the notification using Snackbar.

jsx
Copy code
import React from 'react';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

const Blogs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message');
  const severity = queryParams.get('severity');
  const [snackbarOpen, setSnackbarOpen] = React.useState(!!message);

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      {/* Your Blogs component content here */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          message={message}
          style={{
            backgroundColor: severity === 'success' ? 'green' : 'red',
          }}
        />
      </Snackbar>
    </div>
  );
};

export default Blogs;
--------------------------------------------------------- -->