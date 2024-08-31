import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageProcessingService {
  constructor() {}

  // Convert byte array to a Blob URL for images
  byteArrayToImage(byteArray: Uint8Array): string {
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  }

  // Convert byte array to a Blob URL for videos
  byteArrayToVideo(byteArray: Uint8Array): string {
    const blob = new Blob([byteArray], { type: 'video/mp4' }); 
    return URL.createObjectURL(blob);
  }
}
