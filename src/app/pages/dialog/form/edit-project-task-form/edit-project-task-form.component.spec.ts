import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectTaskFormComponent } from './edit-project-task-form.component';

describe('EditProjectTaskFormComponent', () => {
  let component: EditProjectTaskFormComponent;
  let fixture: ComponentFixture<EditProjectTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
