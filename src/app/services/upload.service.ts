import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = 'http://localhost:8080/api/upload';

  constructor(private http: HttpClient) {}

  uploadImage(file: File, name: string, calories: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('calories', calories.toString());

    return this.http.post(`${this.uploadUrl}/image`, formData).pipe(
      catchError((error) => {
        console.error('Image upload error:', error);
        return throwError(error);
      })
    );
  }

  uploadVideo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.uploadUrl}/video`, formData).pipe(
      catchError((error) => {
        console.error('Video upload error:', error);
        return throwError(error);
      })
    );
  }
}
