import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderProductsComponent } from './manage-order-products.component';

describe('ManageOrderProductsComponent', () => {
  let component: ManageOrderProductsComponent;
  let fixture: ComponentFixture<ManageOrderProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageOrderProductsComponent]
    });
    fixture = TestBed.createComponent(ManageOrderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
