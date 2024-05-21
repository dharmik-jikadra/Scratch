import { Component, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../../../service/products.service';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, EditProductComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent {
  private productService = inject(ProductsService);

  public allCategory = this.productService.getAllCategoryList();
  public productList = this.productService.allProducts;
  public selectedTab = this.productService.selectedTab;

  public tabChange(category: string): void {
    this.productService.selectedTab.set(category);
  }

  public updateProduct(product: any, isDecrease: boolean = false): void {
    this.productService.updateProduct(product.id, {
      quantity: !isDecrease ? product.quantity + 1 : product.quantity - 1,
    });
  }
}
