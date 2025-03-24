import axios from "services/axios.customize"

// Auth
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

// User
const getUserAPI = (query: string) => {
    const urlBackend = `/api/v1/user?${query}`;
    return axios.get<IModalPaginate<IUserModal>>(urlBackend)
}

const createUser = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackend = "/api/v1/user";
    return axios.post<IBackendRes<IRegister>>(urlBackend, {fullName, email, password, phone})
}

const bulkCreateUserAPI = (data: {
    fullName: string,
    email: string,
    password: string,
    phone: string,
}[]) => {
    const urlBackend = "/api/v1/user/bulk-create";
    return axios.post<IBackendRes<IResponseImport>>(urlBackend, data)
}

const updateUserAPI = (_id: string, fullName: string, phone: string) => {
    const urlBackend = "/api/v1/user";
    return axios.put<IBackendRes<IRegister>>(urlBackend, {_id, fullName, phone})
}

const deleteUserAPI = (_id: string) => {
    const urlBackend = `/api/v1/user/${_id}`;
    return axios.delete<IBackendRes<IRegister>>(urlBackend)
}

// Book
const getBookAPI = (query: string) => {
    const urlBackend = `/api/v1/book?${query}`;
    return axios.get<IModalPaginate<IBookModal>>(urlBackend)
}

export {
    loginAPI,
    registerAPI,
    fetchAccountAPI,
    logoutAPI,
    getUserAPI,
    createUser,
    bulkCreateUserAPI,
    updateUserAPI,
    deleteUserAPI,
    getBookAPI
}