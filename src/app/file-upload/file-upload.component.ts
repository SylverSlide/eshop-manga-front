import { Component, EventEmitter } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  files: File[] = [];
  uploadedFilePath = new EventEmitter<string>();

  constructor(private fileUploadService: FileUploadService) {}

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    // Upload du fichier dès qu'il est sélectionné
    this.uploadFiles();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  uploadFiles() {
    this.files.forEach((file) => {
      this.fileUploadService.uploadFile(file).subscribe(
        (response) => {
          console.log('Chemin du fichier uploadé : ', response.path);
          this.uploadedFilePath.emit(response.path);
        },
        (error) => {
          console.error("Erreur lors de l'upload du fichier : ", error);
        }
      );
    });
  }
}
