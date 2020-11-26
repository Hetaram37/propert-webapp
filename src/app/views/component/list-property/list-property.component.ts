import { Component, OnInit, HostListener } from '@angular/core';
import { ViewsService } from '../../views.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss']
})
export class ListPropertyComponent implements OnInit {
  public propertyFilterForm: FormGroup;
  public propertyList = [];
  areaList = [];
  priceRange = [
    {
      display: '0 to 100000',
      value: [0, 100000]
    },
    {
      display: '100001 to 200000',
      value: [100001, 200000]
    },
    {
      display: '200001 to 300000',
      value: [200001, 300000]
    },
    {
      display: '300001 to 400000',
      value: [300001, 400000]
    },
    {
      display: '400001 to 500000',
      value: [400001, 500000]
    },
    {
      display: '500001 to 600000',
      value: [500001, 600000]
    }
  ];
  public bedroomsList = [1, 2, 3, 4, 5, 6];
  public addedDate = [
    {
      display: 'This week',
      value: 7
    },
    {
      display: 'Last 5 week',
      value: 35
    },
    {
      display: 'Last 15 week',
      value: 105
    },
    {
      display: 'Any',
      value: 0
    }
  ];
  private page = 1;
  private nextPageAvailable = true;
  private query: any;
  private allowScroll = true;
  public viewedPropertyList: any;
  constructor(
    private viewService: ViewsService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Form for property filter
    this.propertyFilterForm = new FormGroup({
      area: new FormControl(0, []),
      price: new FormControl(null, []),
      bedrooms: new FormControl(null, []),
      createdOn: new FormControl(null)
    });
    this.getAreaList();
    const query = `page=${this.page}`;
    this.getPropertyList(query);
    this.getViewedPropertyList();
  }

  get area() { return this.propertyFilterForm.get('area'); }
  get price() { return this.propertyFilterForm.get('price'); }
  get bedrooms() { return this.propertyFilterForm.get('bedrooms'); }
  get createdOn() { return this.propertyFilterForm.get('createdOn'); }

  // Get area list
  getAreaList() {
    this.viewService.areaList().subscribe(response => {
      if (this.isValidResoponse(response)) {
        response.data.forEach(area => {
          this.areaList.push({display: area, value: area});
        });
      }
    }, error => {
      throw error;
    });
  }

  isValidResoponse(response) {
    let isValid = false;
    if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
      isValid = true;
    }
    return isValid;
  }

  getPropertyList(query) {
    if (this.nextPageAvailable) {
      this.allowScroll = false;
      this.viewService.getPropertyList(query).subscribe(response => {
        if (response && response.data && response.data.docs) {
          this.propertyList = response.data.docs;
          this.nextPageAvailable = response.data.hasNextPage;
          if (response.data.hasNextPage) {
            this.allowScroll = true;
            this.page++;
          } else {
            this.allowScroll = false;
          }
        }
      }, error => {
        throw error;
      });
    }
  }

  onSubmit() {
    this.query = '';
    if (this.propertyFilterForm.valid) {
      this.query = `page=${this.page = 1}`;
      this.prepareQuery();
      this.getPropertyList(this.query);
    }
  }

  prepareQuery() {
    if (this.propertyFilterForm.get('area').value) {
      this.propertyFilterForm.get('area').value.forEach(ar => {
        this.query = this.query + `&area[]=${ar}`;
      });
    }
    if (this.propertyFilterForm.get('price').value) {
      this.query = this.query + `&price[]=${this.propertyFilterForm.get('price').value[0]}`;
      this.query = this.query + `&price[]=${this.propertyFilterForm.get('price').value[1]}`;
    }
    if (this.propertyFilterForm.get('bedrooms').value) {
      this.query = this.query + `&bedrooms=${this.propertyFilterForm.get('bedrooms').value}`;
    }
    if (this.propertyFilterForm.get('createdOn').value && this.propertyFilterForm.get('createdOn').value !== 'Any') {
      this.query = this.query + `&createdOn=${this.propertyFilterForm.get('createdOn').value}`;
    }
  }

  checkDetails(id) {
    this.router.navigate(['/view_property', id]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.nextPageAvailable && this.allowScroll) {
      this.query = `page=${this.page}`;
      this.prepareQuery();
      this.getPropertyList(this.query);
    }
  }

  makeFavourite(id: string) {
    this.viewService.updateProperty(this.updatePropertBody(id, 'favorite')).subscribe(response => {
      return response;
    }, error => {
      throw error;
    });
  }

  updatePropertBody(propertyId: string, name: string) {
    return {
      id: propertyId,
      key: name
    };
  }

  getViewedPropertyList() {
    this.viewService.getViewedPropertyList().subscribe(response => {
      if (response && response.data && response.data.docs) {
        this.viewedPropertyList = response.data.docs;
      }
    }, error => {
      throw error;
    });
  }

}
