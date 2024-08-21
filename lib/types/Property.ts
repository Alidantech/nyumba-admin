// Enum for property types
export enum PropertyType {
  RealEstate = "real-estate",
  Lease = "lease",
  Rental = "rental",
  Land = "land",
}

// Enum for property status
export enum PropertyStatus {
  Sold = "sold",
  Pending = "pending",
  Approved = "approved",
  ForSale = "forSale",
  Rented = "rented",
  Leased = "leased",
}

// Combining basic info and system info into a single Property type
export interface Property {
  price: number;
  title: string;
  description: string;
  location: {
    lon: number; 
    lat: number; 
  };
  images: File[]; 
  documents: File[]; 
  type: PropertyType;
  isApproved: boolean;
  ownerAddress: string;
  isForSale: boolean;
  status: PropertyStatus;
}
