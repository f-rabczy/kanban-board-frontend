import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectBoardNameFormComponent } from './edit-project-board-name-form.component';

describe('EditProjectBoardNameFormComponent', () => {
  let component: EditProjectBoardNameFormComponent;
  let fixture: ComponentFixture<EditProjectBoardNameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectBoardNameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectBoardNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
