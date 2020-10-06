import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoardNameFormComponent } from './edit-board-name-form.component';

describe('EditBoardNameFormComponent', () => {
  let component: EditBoardNameFormComponent;
  let fixture: ComponentFixture<EditBoardNameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBoardNameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoardNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
