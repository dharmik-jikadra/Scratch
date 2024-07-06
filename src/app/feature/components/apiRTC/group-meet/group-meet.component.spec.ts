import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMeetComponent } from './group-meet.component';

describe('GroupMeetComponent', () => {
  let component: GroupMeetComponent;
  let fixture: ComponentFixture<GroupMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupMeetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
