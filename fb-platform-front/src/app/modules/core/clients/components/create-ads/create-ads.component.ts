import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArrayName, FormControl, FormGroup, Validators} from "@angular/forms";
import {FacebookService} from "../../../services/facebook.service";
import {Campaign} from "../../../../../models/campaign";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {$E} from "@angular/compiler/src/chars";
import {FileUpload} from "primeng/fileupload";

@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.scss']
})
export class CreateAdsComponent implements OnInit {
  valid = true;
  beanAds = new FormGroup({
    name: new FormControl('',[Validators.required]),
    campaign: new FormControl('',[Validators.required]),
    budget: new FormControl(0,[Validators.required]),
   });
  /*
    title : new FormControl([],[Validators.required]),
*/

  compaigns: Campaign[] = [];
  uploadedFiles: any[] = [];
  uploadedFilesVideo: any[] = [];
  @ViewChild('upload') upload !:  FileUpload

  constructor(private facebookApi: FacebookService, private dialogRef: DynamicDialogRef, public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.facebookApi.getAllCompaigns().subscribe((data) => {
      this.compaigns = data;
    })

  }

  onSubmit(): void {
    this.valid = this.beanAds.valid;
    console.log(this.beanAds.value);
    console.log(this.beanAds.valid);
  }

  onchangeCompaigns($event: any): void {
    console.log($event);
  }

  close(): void {
    this.dialogRef.close()

  }

  onUpload(event: any): void {
    let sommelength = event.files.length + this.uploadedFiles.length
    if (event.files.length <= 5 && sommelength <= 5 ) {
      for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }else {
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Vous avez dépassé le nombre de videos autorisés !"'
        });
    }
  }

  onUploadVideo(event: any): void {
    let sommelength = event.files.length + this.uploadedFilesVideo.length
    if (event.files.length <= 5 && sommelength <= 5 ) {
      for (let file of event.files) {
        this.uploadedFilesVideo.push(file);
      }
    } else {
       this.messageService.add(
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Vous avez dépassé le nombre de videos autorisés !"'
        });
    }
  }


}
