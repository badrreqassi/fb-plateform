import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSetListPageComponent } from './ad-set-list-page.component';

describe('AdSetListPageComponent', () => {
  let component: AdSetListPageComponent;
  let fixture: ComponentFixture<AdSetListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdSetListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSetListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
