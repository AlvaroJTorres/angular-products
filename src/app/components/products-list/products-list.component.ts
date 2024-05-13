import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products?: Product[];
  currentProduct: Product = {}
  currentIndex = -1
  title = ''

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts()
  }

  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data
          console.log(data)
        },
        error: (e) => console.error(e)
      })
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }
}
