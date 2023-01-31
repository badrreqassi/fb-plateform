import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreatureComponent } from './list-creature.component';

describe('ListCreatureComponent', () => {
  let component: ListCreatureComponent;
  let fixture: ComponentFixture<ListCreatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCreatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
