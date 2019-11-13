import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any[] = [
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
  constructor() { }

  ngOnInit() {
  }

}
