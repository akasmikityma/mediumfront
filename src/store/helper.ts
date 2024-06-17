//so there is a atom that has all the blogs and then there are a bunch of selectors that fetches ,puts,deletes data from the api ..
import { atom,selector,selectorFamily } from "recoil";


interface blogtype{
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
}

export const blogsState=atom<blogtype[]>({
    key:"blogsstate",
    default:[]
})

const loadingState=atom({
    key:"loadingstate",
    default:false
})
const errorState=atom({
    key:"errorState",
    default:null
})

// selector to get all the blogs-->
const getAllSelector=selector({
    key:'getAllBlogs',
    get:({get})=>{
        return get(blogsState)
    }
})

export const getsingleBlog=selectorFamily({
    key:"getblogbyid",
    get:(blogID)=>({get})=>{
        const blogs=get(blogsState);
        return blogs.find((blog)=>blog.id===blogID)
    }
})