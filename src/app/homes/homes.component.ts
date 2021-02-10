import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  loading = false;

  constructor(private route: ActivatedRoute, private mapService: MapService, private homesService: HomesService) {
    
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const {type, lat, lon, ...rest} = params;
      this.loading = true;
      this.homesService.getHomes(rest, type).subscribe((data) => {
        console.log(data.properties);
        this.mapService.changeCenter({lat, lon})
        this.properties = data.properties;
        this.loading = false;
        data.properties.forEach(prop => {
          this.mapService.addMarkerPopupForProperty(prop);
        })
      });
    })
  }

}
