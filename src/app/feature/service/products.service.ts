import { Injectable, effect, signal } from '@angular/core';
import { products } from '../../shared/constants/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  categoryList = signal(products);
  selectedTab = signal(this.categoryList()[0].categoryName);
  allProducts = signal(this.categoryList()[0].products);

  constructor() {
    effect(
      () => {
        if (this.selectedTab())
          this.allProducts.set(this.getProductByCategory(this.selectedTab()));
      },
      { allowSignalWrites: true }
    );
  }

  getAllCategoryList() {
    return this.categoryList().map((cat) => cat.categoryName);
  }

  getProductByCategory(category: string) {
    const categoryDetail = this.categoryList().find(
      (res) => res.categoryName === category
    );
    return categoryDetail ? categoryDetail?.products : [];
  }

  updateProduct(productId: string, product: any) {
    this.allProducts.update((res) => {
      const index = res.findIndex((res) => res.id === productId);
      res[index] = { ...res[index], ...product };
      return res;
    });
  }
}
