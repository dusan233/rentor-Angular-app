import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchType: string = 'rent';
  constructor() { }

  ngOnInit(): void {
  }

  onChangeSearchType(type: string) {
    this.searchType = type;
  }
}
