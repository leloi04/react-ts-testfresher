export {};

declare global {
    interface IBackendRes<T>{
        error: string | string[];
        message: string;
        statusCode: number | string;
        data: T;
    }

    interface IModalPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    interface ILogin {
        access_token: string;
        user: {
            email: string,
            phone: number | string,
            fullName: string,
            role: string,
            avatar: string,
            id: string
        }
    }

    interface IRegister {
        _id: string,
        email: string,
        fullName: string
    }

    interface IUser {
        email: string,
        phone: number | string,
        fullName: string,
        role: string,
        avatar: string,
        id: string
    }

    interface IFetchAccount {
        user: IUser,
    }

    interface IUserModal {
        _id: string,
        fullName: string,
        email: string,
        phone: string,
        role: string,
        avatar: string,
        createdAt: Date,
        updatedAt: Date,
    }

    interface IResponseImport {
        countSuccess: number,
        countError: number,
        detail: any
    }

    interface IBookModal {
        _id: string,
        thumbnail: string,
        slider: string[],
        mainText: string,
        author: string,
        price: number,
        sold: number,
        quantity: number,
        category: string,
        createdAt: Date,
        updatedAt: Date,
    }

    interface ICart {
        _id: string,
        quantity: number,
        detail: IBookModal
    }
}