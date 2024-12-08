import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { fileEntity } from './Models/fileEntity';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>('http://localhost:8089/PFE/file/upload', formData);
  }
  downloadFile(fileId: number): Observable<Blob> {
    return this.http.get<Blob>(`http://localhost:8089/PFE/file/download/${fileId}`, { responseType: 'blob' as 'json' });
  }

  getAllFiles(): Observable<fileEntity[]> {
    return this.http.get<fileEntity[]>(`http://localhost:8089/PFE/file/files`);
  }

  // uploadFilee(file: File, tuteurId: number): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);

  //   return this.http.post(`http://localhost:8089/PFE/file/upload/${tuteurId}`, formData).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  uploadFilee(file: File, tuteurId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const url = `http://localhost:8089/PFE/file/upload/${tuteurId}`;
    console.log('Uploading file to URL:', url);

    return this.http.post(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
