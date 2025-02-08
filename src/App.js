import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import '../app.css';
import Pagination from './Components/Pagination';
import Stepper from './Components/Stepper';
import EmiCalc from './Components/EmiCalc';
const App = () => {
    return (
        <div>
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
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
