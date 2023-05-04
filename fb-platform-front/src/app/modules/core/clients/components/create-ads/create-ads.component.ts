import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FacebookService} from "../../../services/facebook.service";
import {Campaign} from "../../../../../models/campaign";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {FileUpload} from "primeng/fileupload";
import { forkJoin, map, iif, of, switchMap, repeat, filter, take } from 'rxjs';
import Combination, { AdTitle, Thumbnail } from 'src/app/models/Combination';


@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.scss'],
})
export class CreateAdsComponent implements OnInit {
  MIN_BUDGET = 5;
  minBudgetPerAd = this.MIN_BUDGET;
  valid = true;
  beanAds = new FormGroup({
    name: new FormControl('', [Validators.required]),
    campaign: new FormControl([Validators.required]),
    budget: new FormControl(5, [
      Validators.required,
      Validators.min(this.minBudgetPerAd),
    ]),
    title: new FormControl(''),
  });
  /*
    title : new FormControl([],[Validators.required]),
*/

  compaigns: Campaign[] = [];
  uploadedFiles: any[] = [];
  uploadedFilesVideo: any[] = [];
  @ViewChild('upload') upload!: FileUpload;
  titre: string = '';
  listTitre: AdTitle[] = [];
  disableSlider = true;
  budgetValue = 0;
  adsCount = 1;
  isLoading = false;

  constructor(
    private facebookApi: FacebookService,
    private dialogRef: DynamicDialogRef,
    public messageService: MessageService,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.facebookApi.getAllCampaigns().subscribe((data) => {
      this.compaigns = data;
    });
  }

  async onSubmit(): Promise<void> {
    if (this.beanAds.valid) {
      this.isLoading = true;
      this.valid = this.beanAds.valid;
      this.facebookApi
        .getAdSetById(this.beanAds.value.campaign.ads.data[0].adset_id)
        .pipe(
          switchMap((oldAdSet) => {
            return forkJoin(
              this.uploadedFilesVideo.map((videoFile) =>
                this.facebookApi.createVideo(videoFile)
              )
            ).pipe(map((videos) => ({ videos, oldAdSet })));
          }),
          switchMap((data) => {
            return iif(
              () => this.uploadedFiles.length > 0,
              forkJoin(
                this.uploadedFiles.map((imageFile) =>
                  this.facebookApi.createThumbNail(imageFile)
                )
              ).pipe(map((thumbnails) => ({ ...data, thumbnails }))),
              of(data)
            );
          }),
          switchMap((data: any) => {
            const combinations = this.getCombinations(
              data.videos,
              data.thumbnails ?? [],
              this.listTitre
            );
            return this.facebookApi
              .duplicateAdSets(
                this.beanAds.value.name,
                data.oldAdSet,
                this.beanAds.value.budget / this.adsCount
              )
              .pipe(map((newAdSet) => ({ newAdSet, combinations })));
          }),
          switchMap((data) => {
            return forkJoin(
              data.combinations.map((combination) =>
                this.facebookApi.getVideoStatus(combination.videoId)
              )
            ).pipe(
              repeat({ delay: 5000 }),
              filter((videosStatus) =>
                videosStatus.every((status) => status === 'ready')
              ),
              take(1),
              map(() => data)
            );
          }),
          switchMap(({ combinations, newAdSet }) => {
            return forkJoin(
              combinations.map((combination, index) =>
                this.facebookApi.createAd(newAdSet, combination, index)
              )
            );
          })
        )
        .subscribe({
          next: (data) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Ads created Successfully'
            })
            console.log(data);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: err.message,
              detail: err.error_user_title,
            });
            this.isLoading = false;
          }
        });
    } else {
      this.valid = false;
    }
  }

  onchangeCompaigns($event: any): void {
    console.log('compaign values', $event);
  }

  close(): void {
   // this.dialogRef.close();

    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'If you leave your inputs won’t be saved ! are you sure you want to leave ?',
      icon: ' pi pi-info-circle',

      dismissableMask: true,
      accept: () => {
        this.dialogRef.close()
      }
    });
  }

  onUpload(event: any): void {
    let sommelength = event.files.length + this.uploadedFiles.length;
    if (event.files.length <= 2 && sommelength <= 2) {
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }
      this.setMinBudgetPerAd();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The number of allowed thumbnails has been exceeded!',
      });
    }
  }

  onUploadVideo(event: any): void {
    let sommelength = event.files.length + this.uploadedFilesVideo.length;
    if (event.files.length <= 5 && sommelength <= 5) {
      for (let file of event.files) {
        this.uploadedFilesVideo.push(file);
      }
      this.setMinBudgetPerAd();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The number of allowed videos has been exceeded!"',
      });
    }
  }

  addTitle(): void {
    if (this.beanAds.value.title) {
      if (this.listTitre.length < 5) {
        this.listTitre.push({ name: this.beanAds.value.title });
        this.beanAds.get('title')?.setValue('');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The number of allowed titles has been exceeded! !"',
        });
      }
    }
  }

  activeBugetManul($event: any): void {
    this.disableSlider = !$event.checked;
    if (!this.disableSlider) {
      this.budgetValue = this.beanAds.value.budget;
    } else {
      this.beanAds.get('budget')?.setValue(this.minBudgetPerAd);
    }
  }

  setMinBudgetPerAd(event?: any) {
    const videosCount = this.uploadedFilesVideo.length > 0 ? this.uploadedFilesVideo.length : 1;
    const thumbnailsCount = this.uploadedFiles.length > 0 ? this.uploadedFiles.length : 1;
    const adsCount = videosCount * thumbnailsCount;
    const minBudget =  adsCount * this.MIN_BUDGET;
    if(this.beanAds.value.budget < minBudget){
      this.beanAds.get('budget')?.setValue(minBudget);
      this.minBudgetPerAd = minBudget;
      this.adsCount = adsCount;
    }
  }

  private getCombinations(
    videos: string[],
    thumbnails: Thumbnail[],
    titles: AdTitle[]
  ): Combination[] {
    let combinations: Combination[] = [];
    videos.forEach((videoId) => {
      if (thumbnails.length > 0) {
        thumbnails.forEach((thumbnail) => {
          combinations.push({videoId, thumbnail, titles,
          });
        });
      } else {
        combinations.push({videoId, titles});
      }
    });
    return combinations;
  }
}
