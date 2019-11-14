import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/products.service';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getHomeProducts();
  }
  getHomeProducts(){
    this.productService.getHomeProducts().subscribe(res => {
      console.log(res.body);
      
      this.products = res.body;
    })
  }

}
