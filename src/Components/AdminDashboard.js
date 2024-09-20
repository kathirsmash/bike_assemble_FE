import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import './../Assets/Css/AdminDashboard.css';
import AdminService from './../Services/AdminService';
import Logout from './Logout';
import moment from 'moment';

const AdminDashboard = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await AdminService.getBikesAssembled(
                moment().subtract(5, 'days').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
            );
            setData(res.data);
        } catch (err) {
            console.error('Assembly error:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="chart-container">

            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="production" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>

            <Logout />
        </div>
    );
};

export default AdminDashboard;
