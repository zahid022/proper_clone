import api from "@/plugins/axios";
import type { login } from "@/types/auth.type";
import type { postCategory, postProduct, postTag, ProductVariant } from "@/types/database.type";
import getToken from "@/utils/getToken";

export class authentication {
    static async login(obj: login) {
        try {
            const response = await api.post(`/auth/login`, obj)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async check(token : string) {
        try {
            const response = await api.get(`/auth/check`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class Category {
    static async categories() {
        try {
            const response = await api.get(`category`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async nested() {
        try {
            const response = await api.get(`category/nested`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async categoryById(id : string){
        try {
            const response = await api.get(`category/${id}`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async create(obj : postCategory){
        try {
            const token = getToken()
            const response = await api.post('category', obj, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async update(id :string, obj : any){
        try {
            const token = getToken()
            const response = await api.post(`category/${id}`, obj, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteCategory(id : string){
        try {
            const token = getToken()

            const response = await api.delete(`category/${id}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class Tag {
    static async tags(){
        try {
            const response = await api.get(`tag`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async create(obj : postTag){
        try {
            const token = getToken()
            const response = await api.post(`tag`, obj, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async update(id : string, obj : postTag){
        try {
            const token = getToken()
            const response = await api.post(`tag/${id}`, obj, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteTag(id : string){
        try {
            const token = getToken()
            const response = await api.delete(`tag/${id}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class image {
    static async uploadImage(data : any){
        try {
            const token = getToken()
            const response = await api.post(`/upload`, data, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class product {
    static async getProducts() {
        try {
            const response = await api.get(`/product`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async getByIdProduct(id : string){
        try {
            const response = await api.get(`/product/${id}`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async addVariant(id : string, params : ProductVariant){
        try {
            const token = getToken()
            const response = await api.post(`/product/${id}/variant`, params, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async addProduct(obj : postProduct){
        try {
            const token = getToken()
            const response = await api.post('product', obj, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteProduct(id : string){
        try {
            const token = getToken()
            const response = await api.delete(`product/${id}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}