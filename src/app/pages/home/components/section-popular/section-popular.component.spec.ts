import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPopularComponent } from './section-popular.component';

describe('SectionPopularComponent', () => {
  let component: SectionPopularComponent;
  let fixture: ComponentFixture<SectionPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionPopularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
