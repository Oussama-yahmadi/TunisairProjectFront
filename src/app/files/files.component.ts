import { Component, OnInit } from '@angular/core';
import { fileEntity } from '../Models/fileEntity';
import { FileServiceService } from '../file-service.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit{
  files: fileEntity[]= [];

  constructor(private fileService: FileServiceService) { }
  ngOnInit(): void {
    this.fileService.getAllFiles()
    .subscribe(files => this.files = files);
}


downloadFile(fileId: number): void {
  this.fileService.downloadFile(fileId)
    .subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      window.location.reload();
    });
}
  }
