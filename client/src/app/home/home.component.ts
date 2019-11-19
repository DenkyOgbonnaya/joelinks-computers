import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../products/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products$:Observable<Product[]>;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getHomeProducts();
  }
  getHomeProducts(){
    this.products$ = this.productService.getHomeProducts();
  }

}
