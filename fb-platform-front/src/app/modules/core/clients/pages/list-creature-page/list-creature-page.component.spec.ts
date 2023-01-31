import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreaturePageComponent } from './list-creature-page.component';

describe('ListCreaturePageComponent', () => {
  let component: ListCreaturePageComponent;
  let fixture: ComponentFixture<ListCreaturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCreaturePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreaturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
