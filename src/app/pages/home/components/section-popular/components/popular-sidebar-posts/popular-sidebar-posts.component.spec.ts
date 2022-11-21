import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularSidebarPostsComponent } from './popular-sidebar-posts.component';

describe('PopularSidebarPostsComponent', () => {
  let component: PopularSidebarPostsComponent;
  let fixture: ComponentFixture<PopularSidebarPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularSidebarPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularSidebarPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
