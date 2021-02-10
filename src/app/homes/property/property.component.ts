import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../home-model';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;

  constructor() { }

  ngOnInit(): void {
  }

  getPropertyStatus() {
    const status = this.property.prop_status === "for_rent" ? "rent" : "sale"
    return this.property.prop_type.slice(0,1).toUpperCase() + this.property.prop_type.slice(1, this.property.prop_type.length - 1) + " for " + status
  }

}
