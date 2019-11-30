import { Component } from "@angular/core";

@Component({
    selector: "app-footer",
    template: `<div class="footer-container">
        <div class="main-footer">
        <div class="row">
            <div class="col">
            <section class="about">
            <div class="sub_header_logo">
                <img src="/assets/icons/logo.ico" alt="logo"/>
                <span>Joe</span>
                <span>links</span>
            </div>
            <div> Number one in computer accessories, Laptops/Notebooks, Desktops, Printers etc</div>
            <div class="footer_social_icons"> 
                <a href="/#"> <img src="/assets/icons/fb_ic10px.png" alt="facebook"/> </a>
                <a href="/#"> <img src="/assets/icons/twitter_ic15px.png" alt="twitter"/> </a>
                <a href="/#"> <img src="/assets/icons/whatsapp_ic15px.png" alt="whatsapp"/> </a>
            </div>
                </section>
            </div>
            <div class="col">
            <section class="menu">
            <h6>MENU</h6>
            <ul class="sub_header_nav">
                <li> <a routerLink ="/">Home</a></li>
                <li> <a routerLink ="/services">Service</a></li>
                <li> <a routerLink ="/products">Products</a></li>
                <li> <a routerLink ="/about">About</a></li>
            </ul>
                </section>
            </div>
            <div class="col">
            <section class="contact">
            <h6>CONTACT INFO</h6>
            <p>N0 7 water works road</p>
            <p>Abakaliki, Ebony state</p>
            <p>joelinkscomputers@gmail.com</p>
            <p>07069797882</p>
        </section>
            </div>
        </div>
        
        
        </div>
    </div>
    <footer>
            <span> Joelinks 2019    All Rights Reserved</span>
            <span> <a routerLink ="/contact">Contact</a> </span>
        
        </footer>
    `,
    styles: [`
        .footer-container {
            display: flex;
            flex-direction: column;
            color: #ccc;
            align-items: center;
            background: #030407;
            font-size: 12px;
            padding:10px;
        }
        .main-footer {
            column-count: 2;
        }
        footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background: #212121;
            padding: 5px 50px 5px 50px;
            color: #ccc;
            font-size: 12px;
        }
        .sub_header_nav li a {
            color: #ccc;
        }
        .sub_header_nav li a:hover {
            color: crimson;
            text-decoration: none;
        }
        footer span a {
            color: #ccc;
        }
        footer span a:hover {
            color: crimson;
            text-decoration: none;
        }
        section {
            margin-right: 10px;
        }
        .main-footer {
            display: flex;
            flex-direction: row;
        }
        .about {
            width: 200px;
        }
        .sub_header_logo :nth-child(2) {
            color: crimson;
        }
        .sub_header_logo {
            font-weight: bold;
            font-size: 30px;
        }
        .sub_header_nav {
            list-style: none;
            padding: 0;
        }
        .footer_social_icons a {
            margin-left: 10px;
        }
    `]
})
 export class FooterComponent {
    thisYear:number = new Date().getFullYear()
 }