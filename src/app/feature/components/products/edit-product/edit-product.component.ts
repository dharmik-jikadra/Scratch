import { Component, effect, inject } from '@angular/core';
import { ProductsService } from '../../../service/products.service';
import { SafePipe } from '../../../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
  private productService = inject(ProductsService);
  public allProducts = this.productService.allProducts;

  public updateProduct(event: any, product: any, property: string): void {
    const updateData = { [property]: event.value };
    this.productService.updateProduct(product.id, updateData);
  }

  public deleteProduct(index: number) {
    this.productService.deleteProduct(index);
  }
}
