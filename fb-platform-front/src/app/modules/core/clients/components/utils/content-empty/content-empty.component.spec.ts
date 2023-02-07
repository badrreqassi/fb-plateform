import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEmptyComponent } from './content-empty.component';

describe('ContentEmptyComponent', () => {
  let component: ContentEmptyComponent;
  let fixture: ComponentFixture<ContentEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
