import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserChatsComponent } from './all-user-chats.component';

describe('AllUserChatsComponent', () => {
  let component: AllUserChatsComponent;
  let fixture: ComponentFixture<AllUserChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllUserChatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllUserChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
