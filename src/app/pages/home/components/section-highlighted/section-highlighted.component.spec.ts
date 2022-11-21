import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHighlightedComponent } from './section-highlighted.component';

describe('SectionHighlightedComponent', () => {
  let component: SectionHighlightedComponent;
  let fixture: ComponentFixture<SectionHighlightedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionHighlightedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionHighlightedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
