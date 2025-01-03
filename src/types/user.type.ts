export interface User {
    firstName : string;
    lastName : string;
    email : string;
    role : "admin" | "user";
    balance : number;
    profile : UserProfile;
}

export interface UserProfile {
    addressTitle : string;
    country : string;
    street : string;
    city : string;
    postalCode : string;
    gender : "male" | "female";
    state : string;
    phone : string;
}