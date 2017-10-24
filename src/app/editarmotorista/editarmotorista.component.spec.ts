import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarmotoristaComponent } from './editarmotorista.component';

describe('EditarmotoristaComponent', () => {
  let component: EditarmotoristaComponent;
  let fixture: ComponentFixture<EditarmotoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarmotoristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarmotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
