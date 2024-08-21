// types.ts
export interface Property {
    id: number;
    owner: string;
    uri: string;
    price: number;
    rent: number;
    status: number; // 0 = Available, 1 = Sold, 2 = Rented
}

export interface User {
    id: number;
    walletAddress: string;
}

export interface RealEstateMarketPlace {
    registerUser(): Promise<void>;
    addProperty(uri: string, price: number, rent: number): Promise<void>;
    buyProperty(propertyId: number): Promise<void>;
    rentProperty(propertyId: number): Promise<void>;
    getProperty(propertyId: number): Promise<Property>;
    availableProperties(): Promise<Property[]>;
    getMyProperties(): Promise<Property[]>;
    getUserByAddress(userAddress: string): Promise<[boolean, number]>;
}
