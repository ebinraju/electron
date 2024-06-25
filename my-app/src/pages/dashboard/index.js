// import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return <div>
        <p>dashboard</p>
        <Outlet />
    </div>
};
export default Dashboard;