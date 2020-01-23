import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtobusComponent } from './otobus.component';

describe('OtobusComponent', () => {
  let component: OtobusComponent;
  let fixture: ComponentFixture<OtobusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtobusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtobusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
