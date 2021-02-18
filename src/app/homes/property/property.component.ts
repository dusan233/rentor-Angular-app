import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../home-model';
import { HomesService } from '../homes.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  @Input() savedProperties: Property[];
  constructor(private propertiesService: HomesService) { }

  ngOnInit(): void {
    
  }

  getPropertyStatus() {
    const status = this.property.prop_status === "for_rent" ? "rent" : "sale"
    return this.property.prop_type.slice(0,1).toUpperCase() + this.property.prop_type.slice(1, this.property.prop_type.length - 1) + " for " + status
  }

  onSaveProperty() {
    this.propertiesService.saveProperty(this.property);
  }

  onCheckIfSaved() {
    const index = this.savedProperties.findIndex(prop => prop.property_id === this.property.property_id)
    if(index === -1) return false;
    return true
  }

}
