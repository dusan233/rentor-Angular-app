import { Component, OnInit } from '@angular/core';
import { Property } from '../homes/home-model';
import { HomesService } from '../homes/homes.service';

@Component({
  selector: 'app-saved-properties',
  templateUrl: './saved-properties.component.html',
  styleUrls: ['./saved-properties.component.css']
})
export class SavedPropertiesComponent implements OnInit {

  savedProperties: Property[] = [];

  constructor(private propertiesService: HomesService) { }

  ngOnInit(): void {
    this.savedProperties = this.propertiesService.getSavedProperties();

    this.propertiesService.propertySavedRemoved.subscribe(property => {
      const elIndex = this.savedProperties.findIndex(prop => prop.property_id === property.property_id)
      if(elIndex === -1) {
        this.savedProperties.push(property)
      }else {
        this.savedProperties = this.savedProperties.filter(prop => prop.property_id !== property.property_id);
      }
    })
  }

}
