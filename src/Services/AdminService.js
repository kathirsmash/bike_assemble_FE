import AxiosInstance from './AxiosInstance';

const getBikesAssembled = async (from, to) => {
    const response = await AxiosInstance.get('/productionLog/bikes-assembled', {
        params: { from, to },
    });
    return response.data;
};

const getEmployeeProduction = async (date) => {
    const response = await AxiosInstance.get('/admin/employee-production', {
        params: { date },
    });
    return response.data;
};

export default {
    getBikesAssembled,
    getEmployeeProduction,
};