import React, { useEffect, useState } from 'react';
import './../Assets/Css/BikeAssembly.css';
import EmployeeService from './../Services/EmployeeService';
import Logout from './Logout';
import { showErrorAlert } from './../utils/alert';

const BikeAssembly = () => {

    const [bikeArray, setBikeArray] = useState([]);

    const assembleBike = async (bikeId) => {
        try {
            const resp = await EmployeeService.assembleBike({ bikeId });
            showErrorAlert('success', resp.message);
        } catch (err) {
            console.error('Assembly error:', err);
        }
    };

    const getBikes = async () => {
        try {
            const resp = await EmployeeService.getBikes();
            setBikeArray(resp.data);
        } catch (err) {
            console.error('Assembly error:', err);
        }
    };

    useEffect(() => {
        getBikes();
    }, []);

    return (
        <div className="bike-buttons">
            {
                bikeArray.map(bike =>
                    <button onClick={() => assembleBike(bike._id)}>{bike.name}</button>
                )
            }
            <Logout />
        </div>
    );
};

export default BikeAssembly;
