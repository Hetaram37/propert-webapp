import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewsRoutingModule } from './views-routing.module';
import { AddPropertyComponent } from './component/add-property/add-property.component';
import { ListPropertyComponent } from './component/list-property/list-property.component';
import { ViewPropertyComponent } from './component/view-property/view-property.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';

@NgModule({
  declarations: [
    AddPropertyComponent,
    ListPropertyComponent,
    ViewPropertyComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    HttpClientModule,
    NgbModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    SelectAutocompleteModule
  ]
})
export class ViewsModule { }
