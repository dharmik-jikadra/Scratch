import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPolygoneComponent } from './map-polygone.component';

describe('MapPolygoneComponent', () => {
  let component: MapPolygoneComponent;
  let fixture: ComponentFixture<MapPolygoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPolygoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapPolygoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
