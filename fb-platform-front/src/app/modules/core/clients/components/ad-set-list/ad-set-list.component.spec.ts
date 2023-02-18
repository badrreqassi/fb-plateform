import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSetListComponent } from './ad-set-list.component';

describe('AdSetListComponent', () => {
  let component: AdSetListComponent;
  let fixture: ComponentFixture<AdSetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdSetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
