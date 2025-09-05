import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishRestaurantPageComponent } from './publish-restaurant-page.component';

describe('PublishRestaurantPageComponent', () => {
  let component: PublishRestaurantPageComponent;
  let fixture: ComponentFixture<PublishRestaurantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishRestaurantPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishRestaurantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
