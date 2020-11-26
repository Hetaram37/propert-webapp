import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewsService } from '../../views.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  public addPropertyForm: FormGroup;
  public bedroomsList = [1, 2, 3, 4, 5, 6];
  public bathsList = [1, 2, 3, 4, 5, 6];
  public images: File[] = [];
  public selectedImage: File[] = [];
  public success: string;
  constructor(
    private viewService: ViewsService
  ) { }

  ngOnInit() {

    // Validate form
    this.addPropertyForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(250)
      ]),
      file: new FormControl(null, [
        Validators.required
      ]),
      propertyImage: new FormControl(null),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      area: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999999)
      ]),
      bedrooms: new FormControl(null, [
        Validators.required
      ]),
      bath: new FormControl(null, [
        Validators.required
      ]),
      carpetFT: new FormControl(null, [
        Validators.required
      ]),
      carpetYD: new FormControl(null, [
        Validators.required
      ]),
      carpetMT: new FormControl(null, [
        Validators.required
      ])
    });
  }

  // Get form values
  get name() { return this.addPropertyForm.get('name'); }
  get description() { return this.addPropertyForm.get('description'); }
  get file() { return this.addPropertyForm.get('file'); }
  get address() { return this.addPropertyForm.get('address'); }
  get area() { return this.addPropertyForm.get('area'); }
  get price() { return this.addPropertyForm.get('price'); }
  get bedrooms() { return this.addPropertyForm.get('bedrooms'); }
  get bath() { return this.addPropertyForm.get('bath'); }
  get carpetFT() { return this.addPropertyForm.get('carpetFT'); }
  get carpetYD() { return this.addPropertyForm.get('carpetYD'); }
  get carpetMT() { return this.addPropertyForm.get('carpetMT'); }

  onSubmit() {
    this.success = null;

    // Mark all fields as touched to check if we have missed any field
    this.addPropertyForm.markAllAsTouched();
    if (this.addPropertyForm.valid) {
      // Send data as form data
      const formData: any = new FormData();
      formData.append('name', this.addPropertyForm.get('name').value);
      for (const img of this.selectedImage) {
        formData.append('propertyImage', img, img.name);
      }
      formData.append('description', this.addPropertyForm.get('description').value);
      formData.append('address', this.addPropertyForm.get('address').value);
      formData.append('area', this.addPropertyForm.get('area').value);
      formData.append('price', this.addPropertyForm.get('price').value);
      formData.append('bedrooms', this.addPropertyForm.get('bedrooms').value);
      formData.append('bath', this.addPropertyForm.get('bath').value);
      formData.append('carpetFT', this.addPropertyForm.get('carpetFT').value);
      formData.append('carpetYD', this.addPropertyForm.get('carpetYD').value);
      formData.append('carpetMT', this.addPropertyForm.get('carpetMT').value);
      this.addProperty(formData);
    }
  }

  addProperty(propertyDetails) {
    this.viewService.addNewProperty(propertyDetails).subscribe(response => {
      this.success = 'New property added successfully';
      return response;
    }, error => {
      this.success = 'Failed to add new property';
      throw error;
    });
  }

  // Image Preview
  onFileChange(event) {
    this.images = [];
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      if (filesAmount > 5) {
        // set error if we upload more then 5 imaages
        const imageControl = this.addPropertyForm.get('file');
        imageControl.setErrors({ numberOfImage: true });
        return;
      }
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (events: any) => {
          this.images.push(events.target.result);
          this.selectedImage.push(file);
          this.addPropertyForm.patchValue({
            propertyImage: this.images
          });
          this.addPropertyForm.get('propertyImage').updateValueAndValidity();
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
