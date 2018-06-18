import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageService } from 'app/services/message.service';
import { CoreModule } from 'app/shared/core.module';


describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
      imports: [
        CoreModule,
      ],
      providers: [
        MessageService, // has no ext dependencies and simple enough to not be mocked
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
