import { Component } from '@angular/core';
import { UploadService } from './services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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

  onSubmitVideo(form: NgForm) {
    if (this.videoFile) {
      this.uploadService.uploadVideo(this.videoFile).subscribe(
        (response) => {
          console.log('Success:', response);
           this.snackBar.open('Video uploaded successfully', '', {
             duration: 3000,
             verticalPosition: 'top',
             horizontalPosition: 'center',
             panelClass: ['success-snackbar'],
           });
          this.clearVideoForm(form);
        },
        (error) => {
          console.error('Video upload error:', error);
          this.snackBar.open('Video upload failed', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar'],
          });
          this.clearVideoForm(form);
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

  clearVideoForm(form: NgForm) {
    this.videoFile = null;
    form.resetForm();
    (<HTMLInputElement>document.getElementById('videoFile')).value = '';
  }
}
