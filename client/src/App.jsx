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
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import JobList from './pages/jobs/Joblist';
import EmployeeProfile from './pages/EmployeeProfile/EmployeeProfile';
import EmployerProfile from './pages/EmployerProfile/EmployerProfile';
import CreateJob from './pages/EmployerProfile/CreateJob';

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
                                <Route path='profile' >
                                    <Route path='Employee' element={<EmployeeProfile />} />
                                    <Route path='Employer' >
                                        <Route index element={<EmployerProfile />} />
                                        <Route path='create-job' element={<CreateJob />} />
                                    </Route>
                                </Route>
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
