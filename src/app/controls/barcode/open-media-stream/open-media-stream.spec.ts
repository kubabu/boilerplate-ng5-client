import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMediaStreamComponent } from './open-media-stream.component';

describe('OpenMediaStreamComponent', () => {
  let component: OpenMediaStreamComponent;
  let fixture: ComponentFixture<OpenMediaStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMediaStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenMediaStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
