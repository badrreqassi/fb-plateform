import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedAccountComponent } from './connected-account.component';

describe('ConnectedAccountComponent', () => {
  let component: ConnectedAccountComponent;
  let fixture: ComponentFixture<ConnectedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectedAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
