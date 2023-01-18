import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskEditComponent } from './project-task-edit.component';

describe('ProjectTaskEditComponent', () => {
  let component: ProjectTaskEditComponent;
  let fixture: ComponentFixture<ProjectTaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTaskEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
