import { Component } from "@angular/core";

@Component({
    selector: "app-services",
    template: `
    <section class="services">
    <div class="card_main">
        <div class="card cards">
            <img src="/assets/icons/desktop_ic30px.png" class="card_icon" />
            <div class="service_title">Computer Accessories</div>
            <p>Sales of all manner of computer accessories, Laptops, Desktops, etc</p>
        </div>
        <div class="card">
            <img src="/assets/icons/desktop_ic130px.png" class="card_icon" />
            <div class="service_title">Office equipments</div>
            <p>Assorted office equipments, printers, photocopy machines etc.</p>
        </div>
        <div class="card cards">
            <img src="/assets/icons/desktop_ic30px.png" class="card_icon" />
            <div class="service_title">Maintenance and servicing</div>
            <p>Maintenance and servicing of all computer accessories, office equipments etc.</p>
        </div>
    </div>
</section>
    `,
    styles: [`
    .card_main {
        column-count: 1;
        column-gap: 20px;
        margin: 20px
    }
    .card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 14px;
        height: 180px;
        margin-bottom: 15px;
        padding: 24px;
        box-sizing: border-box;
        -webkit-column-break-inside: avoid;
        box-sizing: border-box;
        -moz-box-shadow: 2px 2px 2px 2px #777777;
        -webkit-box-shadow: 2px 2px 2px 2px #777777;
        box-shadow: 2px 2px 2px 2px #777777;
    }
     
    .card p{
        text-align: left;
    }
    .card .service_title {
        font-weight: bold;
        font-size: 14px;
    }
    .card:nth-child(2) {
        background: crimson;
        color: #ddd;
    }
    .cards {
        border-top: 2px solid crimson;
        border-bottom: 2px solid crimson;
    }
    @media only screen and (min-width: 65.625em) {
        /* Break out main cards into three columns */
        .card_main {
            column-count: 3;
            column-gap: 10px;
            width: 650px;
            margin: 10px auto 10px auto;
          }
          .card {
              width: 200px;
          }
    }
    
    `]
})

export class ServiceComponent {

}