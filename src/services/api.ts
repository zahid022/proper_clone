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

    static async register(obj: any) {
        try {
            const response = await api.post(`/auth/register`, obj)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async forgot(email : string) {
        try {
            const response = await api.post(`/forget_password`, {email})
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async confirm(obj : any) {
        try {
            const response = await api.post(`/forget_password/confirm`, obj)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async check(token: string) {
        try {
            const response = await api.get(`/auth/check`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

}

export class User {
    static async update(obj : any) {
        try {
            const token = getToken()
            const response = await api.post("/user/update", obj , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async resetPassword(obj : any) {
        try {
            const token = getToken()
            const response = await api.post("/user/password", obj , {
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

export class Country {
    static async list(){
       try {
            const response = await api.get("/country")
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

    static async categoryById(id: string) {
        try {
            const response = await api.get(`category/${id}`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async create(obj: postCategory) {
        try {
            const token = getToken()
            const response = await api.post('category', obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async update(id: string, obj: any) {
        try {
            const token = getToken()
            const response = await api.post(`category/${id}`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteCategory(id: string) {
        try {
            const token = getToken()

            const response = await api.delete(`category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class Tag {
    static async tags() {
        try {
            const response = await api.get(`tag`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async create(obj: postTag) {
        try {
            const token = getToken()
            const response = await api.post(`tag`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async update(id: string, obj: postTag) {
        try {
            const token = getToken()
            const response = await api.post(`tag/${id}`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteTag(id: string) {
        try {
            const token = getToken()
            const response = await api.delete(`tag/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class image {
    static async uploadImage(data: any) {
        try {
            const token = getToken()
            const response = await api.post(`/upload`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class product {
    static async getProducts(filter: any) {
        try {

            const params = new URLSearchParams();

            for (const key in filter) {
                if (filter[key]) {
                    params.append(key, filter[key]);
                }
            }

            const response = await api.get(`/product?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getByIdProduct(id: string) {
        try {
            const response = await api.get(`/product/${id}`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async getBySlug(slug: string) {
        try {
            const response = await api.get(`/product/slug/${slug}`)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async addVariant(id: string, params: ProductVariant) {
        try {
            const token = getToken()
            const response = await api.post(`/product/${id}/variant`, params, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async addProduct(obj: postProduct) {
        try {
            const token = getToken()
            const response = await api.post('product', obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteProduct(id: string) {
        try {
            const token = getToken()
            const response = await api.delete(`product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}