import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from './home-model';

interface PropertiesResponse {
  meta: {
    matching_rows: number,
    returned_rows: number,

  },
  properties: Property[]
}



@Injectable({
  providedIn: 'root'
})
export class HomesService {

  constructor(private http: HttpClient) { }

  getHomes(params: {[key: string]: any}, type: string) {
    console.log('ds', params);
    if(type === "rent") {
      return this.http.get<PropertiesResponse>('https://realtor.p.rapidapi.com/properties/v2/list-for-rent', {
        params: {
          price_min: '0',
          price_max: "2000",
          ...params,
          limit: "20",
          offset: "0"
        }
      })
    }
  }
}
