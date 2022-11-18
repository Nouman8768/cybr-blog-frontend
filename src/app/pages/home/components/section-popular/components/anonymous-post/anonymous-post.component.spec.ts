import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousPostComponent } from './anonymous-post.component';

describe('AnonymousPostComponent', () => {
  let component: AnonymousPostComponent;
  let fixture: ComponentFixture<AnonymousPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnonymousPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonymousPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
