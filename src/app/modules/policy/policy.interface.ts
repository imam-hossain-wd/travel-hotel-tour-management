

















// ###############################################################
// when need policy ? that time i need a separate policy when my application large scale and policy is the large then i need to create a separate policy module
// ..##########################################

















// Tour
//  └── policy: ITourPolicy

// Hotel
//  └── policy: IHotelPolicy

// Room
//  └── policy: IRoomPolicy

// export interface ITourPolicy {
//     cancellationPolicy?: string;
//     refundPolicy?: string;
//     termsAndConditions?: string[];
// }

// Common Policy Module (Enterprise)

// Policy

// Tour
//     policy: ObjectId

// Hotel
//     policy: ObjectId
// Room
//     policy: ObjectId

// export interface IPolicy {
//     title: string;
//     cancellationPolicy?: string;
//     refundPolicy?: string;
//     paymentPolicy?: string;
//     termsAndConditions?: string[];
// }