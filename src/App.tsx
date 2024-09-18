import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog';
import Blogs from './Pages/Blogs';
import Auth from './Components/Auth';
import Create from './Components/Create';
import Edit from './Pages/Edit';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Auth type={"signUp"} />} />
                <Route path='/signup' element={<Auth type={"signUp"} />} />
                <Route path='/signin' element={<Auth type={"signin"} />} />
                <Route path='/blog/:id' element={<Blog />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/create' element={<Create />} />
                <Route path='/update/:id' element={<Edit />} />
            </Routes>
        </Router>
    );
};

export default App;
