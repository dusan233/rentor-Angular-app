import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const { lat, lon } = this.route.snapshot.queryParams
    this.mapService.buildMap(lon, lat);
  }

}
