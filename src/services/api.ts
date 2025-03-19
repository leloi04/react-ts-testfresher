import axios from "services/axios.customize"

const loginAPI = (username: string, password: string) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(urlBackend, {username, password},);
}

const logoutAPI = () => {
    const urlBackend = "/api/v1/auth/logout";
    return axios.post<IBackendRes<ILogin>>(urlBackend);
}

const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackend = "/api/v1/user/register";
    return axios.post<IBackendRes<IRegister>>(urlBackend, {fullName, email, password, phone})
}

const fetchAccountAPI = () => {
    const urlBackend = "/api/v1/auth/account";
    return axios.get<IFetchAccount>(urlBackend, {
        headers: {
            delay: 3000,
        }
    })
}


export {
    loginAPI,
    registerAPI,
    fetchAccountAPI,
    logoutAPI
}