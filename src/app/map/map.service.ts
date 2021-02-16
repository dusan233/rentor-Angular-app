import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Property } from '../homes/home-model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  map: mapboxgl.Map;
  markers: mapboxgl.Marker[] = [];
  constructor() { 
    
  }

  buildMap(lon: number, lat: number) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 8,
      accessToken: 'pk.eyJ1IjoiZHVzYW4yMyIsImEiOiJja2t3czR2bzYyOXMwMm9xbnVxem9xcmtkIn0.LEbwRcmyPL_To6WjbosFhQ'
    })
    
  }
  changeCenter(cords: {lat: number, lon: number} ) {
    this.map.flyTo({
      center: cords,
      zoom: 8
    })
  }

  addMarkerPopupForProperty(property: Property) {
      const popup = new mapboxgl.Popup({offset: 20}).setHTML(`
        <div class='popup'>
          <div class='image-container'>
            <a target="_blank" href="${property.rdc_web_url}">
            <img src="${property.photos[0].href}" />
            </a>
          </div>
          <div class='content'>
            <h1>${property.community ? property.community.name : 'No name'} </h1>
            <p>$${property.community ? property.community.price_min : ''}/month</p>
          </div>
        </div>
      `)

      const el = document.createElement('div');
      el.innerHTML = `
        <p>$${property.community ? property.community.price_min : ''}</p>
      `;
      el.classList.add('marker');

      const marker = new mapboxgl.Marker(el)
        .setLngLat(property.address)
        .setPopup(popup)
        .addTo(this.map);

      this.markers.push(marker);
  }
}
