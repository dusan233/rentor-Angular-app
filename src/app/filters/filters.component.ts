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
      })
    })

    
  }

  onSaveFilterPropertyType() {
    console.log('propType');
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
        prop_type: selectedPropTypes,
        
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
