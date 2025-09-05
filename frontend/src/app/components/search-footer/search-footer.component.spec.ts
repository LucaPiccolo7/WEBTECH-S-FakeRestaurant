import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFooterComponent } from './search-footer.component';

describe('SearchFooterComponent', () => {
  let component: SearchFooterComponent;
  let fixture: ComponentFixture<SearchFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
