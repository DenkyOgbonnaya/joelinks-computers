import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../shared/products.service';
import { Product } from '../product';

@Component({
    templateUrl: "./product-details.component.html",
    styleUrls: ["./product-details.component.css"]
})

export class ProductDetailsComponent {
    pageName:string = "Products Details";
    product:Product = {
        _id:"9",
        name: "Hp EliteBook 8470P",
        price: 82000,
        discounted_price: 65000,
        category: "computers",
        image: "/assets/images/productSample3.jpg",
        brand: "HP",
        description: `what is your 
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea`,
        attributes: {
            display: "14.2inch",
            color: "silver",
            processor: "intel processor corei5 3rd gen",
            ram: "4gb"
        }
    }
    similarProducts:Product[] = [
        {
            _id:"9",
            name: "Hp EliteBook 8470P",
            price: 82000,
            discounted_price: 65000,
            category: "computers",
            image: "/assets/images/productSample3.jpg",
            brand: "HP",
            description: "the Hp EliteBook ",
            attributes: {
                display: "14.2inch",
                color: "silver",
                processor: "intel processor corei5 3rd gen",
                ram: "4gb"
            }
        },
            {
                _id:"9",
                name: "Hp EliteBook 8470P",
                price: 82000,
                discounted_price: 65000,
                category: "computers",
                image: "/assets/images/productSample3.jpg",
                brand: "HP",
                description: "the Hp EliteBook ",
                attributes: {
                    display: "14.2inch",
                    color: "silver",
                    processor: "intel processor corei5 3rd gen",
                    ram: "4gb"
                }
            },
                {
                    _id:"9",
                    name: "Hp EliteBook 8470P",
                    price: 82000,
                    discounted_price: 65000,
                    category: "computers",
                    image: "/assets/images/productSample3.jpg",
                    brand: "HP",
                    description: "the Hp EliteBook ",
                    attributes: {
                        display: "14.2inch",
                        color: "silver",
                        processor: "intel processor corei5 3rd gen",
                        ram: "4gb"
                    }
                },
                    {
                        _id:"9",
                        name: "Hp EliteBook 8470P",
                        price: 82000,
                        discounted_price: 65000,
                        category: "computers",
                        image: "/assets/images/productSample3.jpg",
                        brand: "HP",
                        description: "the Hp EliteBook ",
                        attributes: {
                            display: "14.2inch",
                            color: "silver",
                            processor: "intel processor corei5 3rd gen",
                            ram: "4gb"
                        }
                    }
    ]
    constructor(private route: ActivatedRoute, private productService: ProductService){}

    ngOnInit(){
        //this.getProduct();
    }
    getProduct(){
        const productId:string = this.route.snapshot.params["_id"];
        this.productService.getProduct(productId);
    }

}

