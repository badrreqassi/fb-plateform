import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-show-upload-files',
  templateUrl: './show-upload-files.component.html',
  styleUrls: ['./show-upload-files.component.scss']
})
export class ShowUploadFilesComponent implements OnInit {
  @Input() files: any[] = [];
  @Input() uploadTypeIcon: string = 'pi pi-video';



  constructor() {
  }

  ngOnInit(): void {
  }

  open(file: any): void {
    const url = window.URL.createObjectURL(file);
    window.open(url, '_blank');
  }

  deleteFile(i: number): void {
      this.files.splice(i, 1);
  }
}
