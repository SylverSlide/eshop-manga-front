import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Méthode pour téléverser le fichier
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // Méthode pour afficher l'image
  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/images/${filename}`, {
      responseType: 'blob',
    });
  }
}
