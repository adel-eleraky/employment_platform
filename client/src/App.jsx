import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux';
import store from './rtk/Store';
import Register from './pages/register/Register';
import UnAuthRoute from './middlewares/UnAuthRoute';
import ProtectRoute from './middlewares/protectRoute';
import Profile from './pages/profile/Profile';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import JobList from './pages/jobs/Joblist';

function App() {

    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>

                            <Route path='/' element={<Home />} />
                            <Route element={<UnAuthRoute />} >
                                <Route path='login' element={<Login />} />
                                <Route path='register' element={<Register />} />
                            </Route>

                            <Route element={<ProtectRoute />} >
                                <Route path="profile" element={<Profile />} />
                            </Route>

                            <Route path='jobs' element={<JobList />} />
                        </Route>

                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    )
}

export default App
