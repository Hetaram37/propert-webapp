import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  constructor(
    public httpClient: HttpClient
  ) { }

  linkGeneration(param1, param2) {
    const host = window.location.hostname;
    return param1.protocol + '://' + host + ':' + param1.port + param1.apiPrefix + param2;
  }

  addNewProperty(body) {
    const url = this.linkGeneration(environment.propertyMgmtService, environment.propertyMgmtService.addNewProperty);
    return this.httpClient.post<any>(url, body, { responseType: 'json' });
  }

  propertyDetails(id: string) {
    let url = this.linkGeneration(environment.propertyMgmtService, environment.propertyMgmtService.propertDetails);
    url = url.replace(':id', id);
    return this.httpClient.get<any>(url);
  }

  areaList() {
    const url = this.linkGeneration(environment.propertyMgmtService, environment.propertyMgmtService.areaList);
    return this.httpClient.get<any>(url);
  }

  getPropertyList(query) {
    const url = this.linkGeneration(environment.propertyMgmtService, environment.propertyMgmtService.propertyList) + '?' + query;
    return this.httpClient.get<any>(url);
  }

  updateProperty(body) {
    const url = this.linkGeneration(environment.propertyMgmtService, environment.propertyMgmtService.updateProperty);
    return this.httpClient.put<any>(url, body, { responseType: 'json' });
  }

  getViewedPropertyList() {
    const url = this.linkGeneration(environment.propertyMgmtService, environment.propertyMgmtService.viewProperty);
    return this.httpClient.get<any>(url);
  }

}
