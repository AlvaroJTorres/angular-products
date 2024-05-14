import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false

  @Input() currentProduct: Product = {
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

  message = ''

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    if(!this.viewMode) {
      this.message = ''
      this.getProduct(this.route.snapshot.params["id"])
    }
  }

  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data
          console.log(data)
        },
        error: (e) => console.error(e)
      })
  }

  updateProduct(): void {
    this.message = ''

    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.message = res.message ? res.message : 'This product was updated successfully!'
        },
        error: (e) => console.error(e)
      })
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.message = res.message ? res.message : 'This product was deleted successfully!'
          this.router.navigate(['/products']);
        }, error: (e) => console.error(e)
      })
  }

  goBack(): void {
    this.location.back()
  }

}
