import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostosComponent } from './postos.component';

describe('PostosComponent', () => {
  let component: PostosComponent;
  let fixture: ComponentFixture<PostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
