import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermValidationComponent } from './perm-validation.component';

describe('PermValidationComponent', () => {
  let component: PermValidationComponent;
  let fixture: ComponentFixture<PermValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
