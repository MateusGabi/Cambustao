import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostosManagementComponent } from './postos-management.component';

describe('PostosManagementComponent', () => {
  let component: PostosManagementComponent;
  let fixture: ComponentFixture<PostosManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostosManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostosManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
