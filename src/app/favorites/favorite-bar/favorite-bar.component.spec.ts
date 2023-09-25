import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBarComponent } from './favorite-bar.component';

describe('FavoriteBarComponent', () => {
  let component: FavoriteBarComponent;
  let fixture: ComponentFixture<FavoriteBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteBarComponent]
    });
    fixture = TestBed.createComponent(FavoriteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
