import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularSidebarPostComponent } from './popular-sidebar-post.component';

describe('PopularSidebarPostComponent', () => {
  let component: PopularSidebarPostComponent;
  let fixture: ComponentFixture<PopularSidebarPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularSidebarPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularSidebarPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
