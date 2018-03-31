import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QpaperListComponent } from './qpaper-list.component';

describe('QpaperListComponent', () => {
  let component: QpaperListComponent;
  let fixture: ComponentFixture<QpaperListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QpaperListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QpaperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
