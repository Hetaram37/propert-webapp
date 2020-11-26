import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewsService } from '../../views.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  propertyId: any;
  images = [];
  propertyDetails: any;
  constructor(
    private route: ActivatedRoute,
    private viewService: ViewsService,
  ) {
    this.propertyId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.updatePropertyDetails(this.propertyId, 'count');
    this.getPropertyDetails();
  }

  getPropertyDetails() {
    this.viewService.propertyDetails(this.propertyId).subscribe(response => {
      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        this.images = response.data[0].image_urls;
        this.propertyDetails = response.data[0];
        return response;
      }
    }, error => {
      throw error;
    });
  }

  updatePropertyDetails(id: string, key: string) {
    this.viewService.updateProperty(this.updatePropertBody(id, key)).subscribe(response => {
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
}
