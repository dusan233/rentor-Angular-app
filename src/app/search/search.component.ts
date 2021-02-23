import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAutocomplete } from './autocomplete-model';
import { City } from './city-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() searchType: string;
  canSubmit = false;
  searchForm: FormGroup;
  showClearBtn: boolean = false;
  getCitiesData;
  inputFocused: boolean = false;
  optionFocused: boolean = false;
  lat: number;
  lon: number;
  cities: City[] = [];
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'searchInput': new FormControl(null)
    })
    this.searchForm.controls['searchInput'].valueChanges.subscribe((value) => {
      console.log(value);
      if(value.length > 0) {
        this.showClearBtn = true;
        this.canSubmit = false;
        clearTimeout(this.getCitiesData);
        this.getCitiesData = setTimeout(() => {
          this.getCities(value);
        }, 700);
      }else {
        this.showClearBtn = false
      }
    })
    window.addEventListener('click', this.onWindowClickero);
  }

  

  ngOnDestroy(): void {
    window.removeEventListener('click', this.onWindowClickero)
  }


  onWindowClickero = (e: MouseEvent) => {
    const formEl = document.querySelector('.search-form');
    if(!formEl.contains((e.target as HTMLElement))) {
      this.inputFocused = false;
    }else {
      this.inputFocused = true;
    }
  }

  clearInput() {
    this.searchForm.controls['searchInput'].setValue("");
    this.cities = [];
  }

  getCities(inputValue: string) {
    this.http.get<IAutocomplete>('https://realtor.p.rapidapi.com/locations/auto-complete', {
      params: {
        input: inputValue
      }
    }).subscribe(data => {
      console.log(data);
      this.cities = data.autocomplete.slice(0, 5);
      console.log(this.cities);
    })
  }

  
  onSubmit() {
    this.router.navigate(['homes'], {
      queryParams: {
        city: this.searchForm.controls['searchInput'].value.split(',')[0],
        state_code: (this.searchForm.controls['searchInput'].value.split(',')[1] as string).trim(),
        type: this.searchType,
        lat: this.lat,
        lon: this.lon
      },
      queryParamsHandling: 'merge'
    })
  }

  onSelectCity(e: MouseEvent, city: string, cityCords: {lat: number, lon: number}) {
    // if(e.type === 'keydown') {
    //   e.stopImmediatePropagation();
    //   if ((e as KeyboardEvent).key === "Enter") {
    //     this.searchForm.controls['searchInput'].setValue(city);
    //     this.canSubmit = true;
    //     this.inputFocused = false;
    //     this.lat = cityCords.lat;
    //     this.lon = cityCords.lon;
    //     document.getElementById("cityInput").focus();
    //   }
    // }else {
      this.searchForm.controls['searchInput'].setValue(city);
      this.canSubmit = true;
      this.inputFocused = false;
      this.lat = cityCords.lat;
      this.lon = cityCords.lon;
      document.getElementById("cityInput").focus();
    
    
  }

  // onKeyDown(e: KeyboardEvent) {
  //   if(e.key === "ArrowDown") {
  //     console.log((<HTMLInputElement>e.target).dataset)
  //     if((<HTMLInputElement>e.target).dataset.index === '-1') {
  //       (document.querySelector("[data-index='0']") as HTMLElement).focus()
  //     }else if((<HTMLInputElement>e.target).dataset.index === String(this.cities.length - 1)) {
  //       (document.querySelector("[data-index='-1']") as HTMLElement).focus()
  //     }else {
  //       (<HTMLElement>(<HTMLElement>e.target).nextSibling).focus()
  //     }
  //   }else if(e.key === "ArrowUp") {
  //     if((<HTMLInputElement>e.target).dataset.index === '-1') {
  //       const index = this.cities.length - 1 + "";
  //       (document.querySelector(`[data-index='${index}']`) as HTMLElement).focus()
  //     }else if((<HTMLInputElement>e.target).dataset.index === '0') {
  //       (document.querySelector("[data-index='-1']") as HTMLElement).focus()
  //     }else {
  //       (<HTMLElement>(<HTMLElement>e.target).previousSibling).focus()
  //     }
  //   }
  // }
}
