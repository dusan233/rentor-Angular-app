export interface City {
    area_type: string,
    city: string,
    state_code: string,
    centroid: {
        lon: number,
        lat: number
    }
}