import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private prodService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.prodService.getProducts([]).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }
}
