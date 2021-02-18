export interface Property {
    address: {
        lat: number,
        lon: number,
    },
    community?: {
        name: string,
        price_min: number,
        baths_max: number,
        beds_max: number,
        sqft_min: number
    },
    prop_status: string,
    prop_type: string,
    photos: {href: string}[],
    rdc_web_url: string,
    property_id: string
}