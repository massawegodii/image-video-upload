// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class UploadService {
//   private uploadUrl = 'http://localhost:8080/api/upload';

//   constructor(private http: HttpClient) {}

//   uploadImage(file: File, name: string, calories: number): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('name', name);
//     formData.append('calories', calories.toString());

//     return this.http.post(`${this.uploadUrl}/image`, formData).pipe(
//       catchError((error) => {
//         console.error('Image upload error:', error);
//         return throwError(error);
//       })
//     );
//   }

//   uploadVideo(file: File, name: string): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('name', name);

//     return this.http.post(`${this.uploadUrl}/video`, formData).pipe(
//       catchError((error) => {
//         console.error('Video upload error:', error);
//         return throwError(error);
//       })
//     );
//   }


//   getImages(page: number, size: number, sort: string): Observable<any> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('size', size.toString())
//       .set('sort', sort);
//     return this.http.get<any>(`${this.uploadUrl}/getAllImages`, { params });
//   }

//   getVideos(page: number, size: number, sort: string): Observable<any> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('size', size.toString())
//       .set('sort', sort);
//     return this.http.get<any>(`${this.uploadUrl}/getAllVideos`, { params });
//   }

//   searchImages(query: string): Observable<any> {
//     return this.http.get<any>(`${this.uploadUrl}/searchImages`, {
//       params: new HttpParams().set('query', query),
//     });
//   }

//   searchVideos(query: string): Observable<any> {
//     return this.http.get<any>(`${this.uploadUrl}/searchVideos`, {
//       params: new HttpParams().set('query', query),
//     });
//   }
// }

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = environment.apiUrl;

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

  uploadVideo(file: File, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    return this.http.post(`${this.uploadUrl}/video`, formData).pipe(
      catchError((error) => {
        console.error('Video upload error:', error);
        return throwError(error);
      })
    );
  }

  getImages(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<any>(`${this.uploadUrl}/getAllImages`, { params });
  }

  getVideos(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<any>(`${this.uploadUrl}/getAllVideos`, { params });
  }

  searchImages(query: string): Observable<any> {
    return this.http.get<any>(`${this.uploadUrl}/searchImages`, {
      params: new HttpParams().set('query', query),
    });
  }

  searchVideos(query: string): Observable<any> {
    return this.http.get<any>(`${this.uploadUrl}/searchVideos`, {
      params: new HttpParams().set('query', query),
    });
  }
}

