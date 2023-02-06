import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUploadFilesComponent } from './show-upload-files.component';

describe('ShowUploadFilesComponent', () => {
  let component: ShowUploadFilesComponent;
  let fixture: ComponentFixture<ShowUploadFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUploadFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
