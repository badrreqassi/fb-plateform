import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
    name: new FormControl('', [Validators.required]),
    campaign: new FormControl( [Validators.required]),
    budget: new FormControl(50, [Validators.required]),
    title: new FormControl(''),
  });
  /*
    title : new FormControl([],[Validators.required]),
*/

  compaigns: Campaign[] = [];
  uploadedFiles: any[] = [];
  uploadedFilesVideo: any[] = [];
  @ViewChild('upload') upload !: FileUpload
  titre: string = '';
  listTitre: any[] = [];
  disableSlider = true;
  budgetValue = 0;

  constructor(private facebookApi: FacebookService, private dialogRef: DynamicDialogRef, public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.facebookApi.getAllCompaigns().subscribe((data) => {
      this.compaigns = data;
    })

  }

  onSubmit(): void {
    if (this.beanAds.valid && this.uploadedFilesVideo.length > 0 && this.listTitre.length > 0) {
      this.valid = this.beanAds.valid;
      console.log(this.combinationTesting())

      /*
        this.facebookApi.getAdSetById(this.beanAds.value.campaign.ads.data[0].adset_id).subscribe(oldAdSet => {
      this.facebookApi.duplicateAdSets(oldAdSet).subscribe(newAdSet => {
        console.log("duplicateAdSets",newAdSet);
        this.facebookApi.createAdCreative().subscribe(creativeAd => {
          console.log("adCreative has been created",creativeAd);
          this.facebookApi.createAd(newAdSet.id, creativeAd.id).subscribe(data => {
            console.log('ad has been created', data);
          })
        })
      })
    })
      */

    } else {
      this.valid = false;
    }

  }

  onchangeCompaigns($event: any): void {
    console.log('compaign values', $event);
  }

  close(): void {
    this.dialogRef.close()

  }

  onUpload(event: any): void {
    let sommelength = event.files.length + this.uploadedFiles.length
    if (event.files.length <= 2 && sommelength <= 2) {
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }
    } else {
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Vous avez dépassé le nombre de thumbnails autorisés !"'
        });
    }
  }

  onUploadVideo(event: any): void {
    let sommelength = event.files.length + this.uploadedFilesVideo.length
    if (event.files.length <= 5 && sommelength <= 5) {
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


  addTitle(): void {
    if (this.beanAds.value.title) {
      if (this.listTitre.length <= 5) {
        this.listTitre.push({name: this.beanAds.value.title});
        this.beanAds.get('title')?.setValue('')
      } else {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: 'Vous avez dépassé le nombre de titres autorisés !"'
          });
      }
    }

  }

  activeBugetManul($event: any): void {
    this.disableSlider = !$event.checked
    if (!this.disableSlider) {
      this.budgetValue = this.beanAds.value.budget;
    } else {
      this.beanAds.get('budget')?.setValue(50)
    }
  }


  changeBudget(event: any): void {
    this.budgetValue = this.beanAds.value.budget;
  }

  private combinationTesting(): any [] {
    let combinationTesting : any[] = [];
    this.uploadedFilesVideo.forEach((value , index) => {
      if(this.uploadedFiles.length> 0){
        this.uploadedFiles.forEach(( value2 , index2) =>{
          combinationTesting.push({ video : value,thumbnail: value2,  titles : this.listTitre})
        })
      }else {
        combinationTesting.push({ video : value, titles : this.listTitre})
      }
    })
    return combinationTesting;

  }
}
