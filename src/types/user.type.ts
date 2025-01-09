export interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "user";
    balance: number;
    profile: UserProfile;
    _id?: string;
}

export interface UserProfile {
    addressTitle: string;
    country: string;
    street: string;
    city: string;
    postalCode: string;
    gender: "male" | "female";
    state: string;
    phone: string;
}


export interface UpdateUser {
    profile? : updateProfile
    firstName?: string;
    lastName?: string;
}

export interface updateProfile {
    addressTitle?: string | undefined;
    state?: string | undefined;
    postalCode?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    street?: string | undefined;
    phone?: string | undefined;
}

export interface forgetPasswordType {
    currentPassword: string;
    newPassword: string;
    repeatPassword: string;
}