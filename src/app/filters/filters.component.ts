import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filters: FormGroup

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    console.log(params, 'ss');
    const createPropTypeFilters = (type) => {
      if("prop_type" in params) {
        if(Array.isArray(params.prop_type)) {
          return params.prop_type.includes(type);
        }
        return params.prop_type === type;
      }
      return null
    }
    this.filters = new FormGroup({
      propType: new FormGroup({
        condo: new FormControl(createPropTypeFilters('condo')),
        single_family: new FormControl(createPropTypeFilters('single_family')),
        multi_family: new FormControl(createPropTypeFilters('multi_family')),
        apartment: new FormControl(createPropTypeFilters('apartment')),
      }),
      price: new FormGroup({
        price_min: new FormControl(this.route.snapshot.queryParams.price_min || 0),
        price_max: new FormControl(this.route.snapshot.queryParams.price_max || 2000)
      }),
      sort: new FormControl(params.sort || 'relevance'),
      more: new FormGroup({
        beds_min: new FormControl(this.route.snapshot.queryParams.beds_min || 'any'),
        baths_min: new FormControl(this.route.snapshot.queryParams.baths_min || 'any'),
        allows_dogs: new FormControl(this.route.snapshot.queryParams.allows_dogs || null),
        allows_cats: new FormControl(this.route.snapshot.queryParams.allows_cats || null)
      })
    })

    
  }

  onSaveMoreFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        beds_min: this.filters.get(['more', 'beds_min']).value === 'any' ? null : this.filters.get(['more', 'beds_min']).value,
        baths_min: this.filters.get(['more', 'baths_min']).value === 'any' ? null : this.filters.get(['more', 'baths_min']).value,
        allows_dogs: this.filters.get(['more', 'allows_dogs']).value,
        allows_cats: this.filters.get(['more', 'allows_cats']).value
      },
      queryParamsHandling: 'merge'
    })
  }

  onClearMoreFilters() {
    this.filters.get(['more', 'beds_min']).setValue("any");
    this.filters.get(['more', 'baths_min']).setValue("any");
    this.filters.get(['more', 'allows_dogs']).setValue(null);
    this.filters.get(['more', 'allows_cats']).setValue(null);
    this.onSaveMoreFilters();
  }

  onSaveSort() {
    
    if(!('sort' in this.route.snapshot.queryParams) && this.filters.get('sort').value === 'relevance') return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: this.filters.get('sort').value
      },
      queryParamsHandling: 'merge'
    })
  }
  onClearSort() {
    this.filters.get('sort').setValue('relevance');
    this.onSaveSort();
  }

  onSaveFilterPrice() {
    if(this.filters.get(['price', 'price_min']).value === 0 && this.filters.get(['price', 'price_max']).value === 2000
    && !("price_min" in this.route.snapshot.queryParams) && !("price_max" in this.route.snapshot.queryParams)) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        price_min: this.filters.get(['price', 'price_min']).value,
        price_max: this.filters.get(['price', 'price_max']).value
      },
      queryParamsHandling: 'merge'
    })
  }
  onClearFilterPrice() {
    this.filters.get(['price', 'price_min']).setValue(0);
    this.filters.get(['price', 'price_max']).setValue(2000);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        price_min: null,
        price_max: null
      },
      queryParamsHandling: 'merge'
    })
  }

  onSaveFilterPropertyType() {
    const selectedPropTypes: string[] = [];
    const formValues = this.filters.get('propType').value;
    for(let key in formValues) {
      if(formValues[key]) {
        selectedPropTypes.push(key);
      }
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        prop_type: selectedPropTypes.length ? selectedPropTypes : null,
        
      },
      queryParamsHandling: 'merge'
    })
    
  }
  onClearFilterPropertyType() {
    this.filters.get('propType').reset();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        prop_type:null ,
        
      },
      queryParamsHandling: 'merge'
    })
  }

}
