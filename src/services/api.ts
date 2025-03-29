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

const createBook = (
    thumbnail: string, slider: string[], mainText: string,
    author: string, price: number, sold: number, quantity: number, category: string) => {
    const urlBackend = "/api/v1/book";
    return axios.post<IBackendRes<IBookModal>>(urlBackend, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category})
}

const getCategoryAPI = () => {
    const urlBackend = "/api/v1/database/category";
    return axios.get<IBackendRes<string[]>>(urlBackend)
}

const updateFileAPI = (fileImg: any, folder: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios<IBackendRes<{
        fileUploaded: string
    }>>({
        method: 'post',
        url: "/api/v1/file/upload",
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/formdata",
            "upload-type": folder
        }
    })
}

const updateBook = (
    thumbnail: string, slider: string[], mainText: string,
    author: string, price: number, sold: number, quantity: number, category: string, _id: string) => {
    const urlBackend = `/api/v1/book/${_id}`;
    return axios.put<IBackendRes<IBookModal>>(urlBackend, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category})
}

const deleteBook = ( _id: string) => {
    const urlBackend = `/api/v1/book/${_id}`;
    return axios.delete<IBackendRes<IBookModal>>(urlBackend)}

const getDataBookAPI = (id: string) => {
    const urlBackend = `/api/v1/book/${id}`;
    return axios.get<IBackendRes<IBookModal>>(urlBackend,{
        headers: {
            delay: 3000,
        }
    })
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
    getBookAPI,
    createBook,
    getCategoryAPI,
    updateFileAPI,
    updateBook,
    deleteBook,
    getDataBookAPI
}