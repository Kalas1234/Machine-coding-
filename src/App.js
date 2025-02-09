import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import '../app.css';
import Pagination from './Components/Pagination';
import Stepper from './Components/Stepper';
import EmiCalc from './Components/EmiCalc';
import PasswordGenerator from './Components/PasswordGenerator';
const App = () => {
    return (
        <div className='flex justify-center items-center h-[100vh] flex-col '>
            <h1>This is the Machine coding pratice</h1>
            <Outlet />
        </div>
    );
};

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/pagination',
                element: <Pagination />
            },
            {
                path:'/stepper',
                element: <Stepper />
            },
            {
                path:'/emi',
                element: <EmiCalc />
            },
            {
                path: '/password',
                element : <PasswordGenerator />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
