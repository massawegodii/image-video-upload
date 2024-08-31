import { Component } from '@angular/core';
import { UploadService } from '../../_services/upload.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  imageFile: File | null = null;
  videoFile: File | null = null;
  imageName: string = '';
  imageCalories: number | null = null;

  constructor(
    private uploadService: UploadService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelect(event: any, type: string) {
    if (type === 'image') {
      this.imageFile = event.target.files[0];
    } else if (type === 'video') {
      this.videoFile = event.target.files[0];
    }
  }

  onSubmitImage(form: NgForm) {
    if (this.imageFile && this.imageName && this.imageCalories !== null) {
      this.uploadService
        .uploadImage(this.imageFile, this.imageName, this.imageCalories)
        .subscribe(
          (response) => {
            console.log('Success:', response); // Log success response
            this.snackBar.open('Image uploaded successfully', '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
            this.clearImageForm(form);
          },
          (error) => {
            console.error('Image upload error:', error); // Log error response
            this.snackBar.open('Image upload failed', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['error-snackbar'],
            });
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
