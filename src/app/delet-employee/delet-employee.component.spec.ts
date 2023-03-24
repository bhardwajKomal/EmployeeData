import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletEmployeeComponent } from './delet-employee.component';

describe('DeletEmployeeComponent', () => {
  let component: DeletEmployeeComponent;
  let fixture: ComponentFixture<DeletEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
