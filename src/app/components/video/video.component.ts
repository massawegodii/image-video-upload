import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../../_services/upload.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent {
  videoFile: File | null = null;
  videoName: string = '';
  isUploading: boolean = false;
  @ViewChild('videoFileInput') videoFileInput: any;

  constructor(
    private uploadService: UploadService,
    private toastr: ToastrService
  ) {}

  onFileSelectVideo(event: any) {
    this.videoFile = event.target.files[0];
  }

  onSubmitVideo(form: NgForm) {
    if (this.videoFile && this.videoName) {
      this.isUploading = true;
      this.uploadService.uploadVideo(this.videoFile, this.videoName).subscribe(
        (response) => {
          console.log('Success:', response);
          this.isUploading = false;
          this.toastr.success('Video uploaded successfully');
          this.clearVideoForm(form);
        },
        (error) => {
          console.error('Video upload error:', error);
          this.toastr.warning('Video upload failed. It exceeds 200MB.');
          this.isUploading = false;
          this.clearVideoForm(form);
        },
        () => {
          this.isUploading = false;
        }
      );
    } else {
      this.toastr.warning('Please provide both a video file and a name');
      this.isUploading = false;
    }
  }

  clearVideoForm(form: NgForm) {
    form.reset(); // Clear the form
    this.videoFile = null;
    this.videoName = '';

    // Reset the file input field
    if (this.videoFileInput) {
      this.videoFileInput.nativeElement.value = '';
    }
  }
}
