import { Component } from '@angular/core';
import { UploadService } from '../../_services/upload.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  imageFile: File | null = null;
  imageName: string = '';
  imageCalories: number | null = null;

  constructor(
    private uploadService: UploadService,
    private toastr: ToastrService
  ) {}

  onFileSelect(event: any, type: string) {
    if (type === 'image') {
      this.imageFile = event.target.files[0];
    }
  }

  onSubmitImage(form: NgForm) {
    if (this.imageFile && this.imageName && this.imageCalories !== null) {
      this.uploadService
        .uploadImage(this.imageFile, this.imageName, this.imageCalories)
        .subscribe(
          (response: any) => {
            const responseMessage =
              response.message || 'Image uploaded successfully';
            this.toastr.success(responseMessage, '', {});
            this.clearImageForm(form);
          },
          (error: any) => {
            const errorMessage = error.error.message || 'Image upload failed';
            this.toastr.error(errorMessage, '', {});
            this.clearImageForm(form);
          }
        );
    }
  }

  clearImageForm(form: NgForm) {
    this.imageName = '';
    this.imageCalories = null;
    this.imageFile = null;
    form.resetForm();
    (<HTMLInputElement>document.getElementById('imageFile')).value = '';
  }
}
