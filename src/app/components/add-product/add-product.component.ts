import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  product: Product = {
    handle: '',
    title: '',
    description: '',
    sku: '',
    grams: 0,
    stock: 0,
    price: 0,
    compare_price: 0,
    barcode: ''
  }
  submitted = false

  constructor(private productService: ProductService) { }

  saveProduct(): void {
    const data = {
      handle: this.product.handle,
      title: this.product.title,
      description: this.product.description,
      sku: this.product.sku,
      grams: this.product.grams,
      stock: this.product.stock,
      price: this.product.price,
      compare_price: this.product.compare_price,
      barcode: this.product.barcode
    }

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.submitted = true
        },
        error: (e) => console.error(e)
      })
  }

  newProduct(): void {
    this.submitted = false
    this.product = {
      handle: '',
      title: '',
      description: '',
      sku: '',
      grams: 0,
      stock: 0,
      price: 0,
      compare_price: 0,
      barcode: ''
    }
  }

}
