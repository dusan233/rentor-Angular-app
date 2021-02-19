import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../map/map.service';
import { Property } from './home-model';
import { HomesService } from './homes.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {

  properties: Property[] = [];
  savedProperties: Property[] = [];
  loading = false;

  constructor(private route: ActivatedRoute, private mapService: MapService, private homesService: HomesService) {
    
   }

  ngOnInit(): void {
    this.savedProperties = this.homesService.getSavedProperties();
    this.homesService.propertySavedRemoved.subscribe(property => {
      const elIndex = this.savedProperties.findIndex(prop => prop.property_id === property.property_id)
      if(elIndex === -1) {
        this.savedProperties.push(property)
      }else {
        this.savedProperties = this.savedProperties.filter(prop => prop.property_id !== property.property_id);
      }
    })
    this.route.queryParams.subscribe((params) => {
      const {type, lat, lon, ...rest} = params;
      console.log(rest);
      const transformedParams = {};
      for (let key in rest) {
        if(Array.isArray(rest[key])) {
          transformedParams[key] = rest[key].join(",");
        }else {
          transformedParams[key] = rest[key]
        }
      }
      console.log(transformedParams);
      this.loading = true;
      this.homesService.getHomes(transformedParams, type).subscribe((data) => {
        console.log(data);
        this.mapService.changeCenter({lat, lon});
        this.mapService.markers.forEach(el => {
          el.remove();
        })
        this.mapService.markers = [];
        this.properties = data.properties;
        this.loading = false;
        
        data.properties.forEach(prop => {
          this.mapService.addMarkerPopupForProperty(prop);
        })
      });
    })
    
  }

  

}
