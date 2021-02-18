import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

  propertySavedRemoved = new Subject<Property>();
  

  getHomes(params: {[key: string]: any}, type: string) {
    console.log('ds', params);
    if(type === "rent") {
      return this.http.get<PropertiesResponse>('https://realtor.p.rapidapi.com/properties/v2/list-for-rent', {
        params: {
          sort: 'relevance',
          price_min: '0',
          price_max: "2000",
          ...params,
          limit: "20",
          offset: "0"
        }
      })
    }
  }

  saveProperty(property: Property) {
    let savedProperties: Property[] = JSON.parse(localStorage.getItem('properties')) || [];
    const elIndex = savedProperties.findIndex(prop => prop.property_id === property.property_id)
    if(elIndex === -1) {
      savedProperties.push(property)
    }else {
      savedProperties = savedProperties.filter(prop => prop.property_id !== property.property_id);
    }
    this.propertySavedRemoved.next(property);
    localStorage.setItem("properties", JSON.stringify(savedProperties));
  }
}
