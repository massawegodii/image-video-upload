import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../../_services/upload.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent {
  imageFile: File | null = null;
  videoFile: File | null = null;
  videoName: string = '';
  imageName: string = '';
  imageCalories: number | null = null;

  constructor(
    private uploadService: UploadService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelectVideo(event: any) {
    this.videoFile = event.target.files[0];
  }

  onSubmitVideo(form: NgForm) {
    if (this.videoFile && this.videoName) {
      this.uploadService.uploadVideo(this.videoFile, this.videoName).subscribe(
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
    } else {
      this.snackBar.open('Please provide both a video file and a name', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar'],
      });
    }
  }

  clearVideoForm(form: NgForm) {
    form.reset();
    this.videoFile = null;
    this.videoName = '';
  }
}
