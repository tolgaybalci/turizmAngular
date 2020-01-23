import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuavinComponent } from './muavin.component';

describe('MuavinComponent', () => {
  let component: MuavinComponent;
  let fixture: ComponentFixture<MuavinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuavinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuavinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
