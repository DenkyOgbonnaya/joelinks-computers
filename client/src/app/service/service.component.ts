import { Component } from "@angular/core";

@Component({
    selector: "app-services",
    template: `
        <div class="services_container">
            <div class= "services_intro">WHAT YOU GET FROM US </div>
            <h3>Our Services </h3>
            <div class="card_main">
                <div class="card">
                    <div class="card_icon">icon</div>
                    <div class="service_title">Computer sales</div>
                    <p>Installations of all kind of application software, Operating system, games etc</p>
                </div>
                <div class="card card_2">
                    <div class="card_icon">icon</div>
                    <div class="service_title">Repairs and Servicing</div>
                    <p>Repairs and Servicing of all computers, Laptops, Desktop, printers</p>
                </div>
                <div class="card">
                    <div>icon</div>
                    <div class="service_title">Software installations</div>
                    <p>Sales of assorted computer sytems, printers and cameras</p>
                </div>
            </div>

        </div>
    `,
    styles: [`
    .services_container {
        display: flex;
        flex-direction: column;
        justif-items: center;
    }
    .services_intro, h3 {
        text-align: center;
    }
    .services_intro {
        color:crimson;
        font-weight: bold;
    }
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
        width: 280px;
        height: 150px;
        margin-bottom: 15px;
        padding: 24px;
        box-sizing: border-box;
        background: grey;
    }
     
    .card p{
        text-align: left;
        font-size: 12px;
    }
    .card .service_title {
        font-weight: bold;
        font-size: 14px;
    }
    .card:nth-child(2) {
        position: relative;
    }
    .card_2:before, .card_2:after, .card_2>:first-child:before, .card_2>:first-child:after {
        position: absolute;
        content: "";
        width:80px;
        height: 80px;
        border: 2px solid crimson
    }
    .card_2:before{
        top:0;
        left: 0;
        border-width: 1px 0 0 1px;
    }
    .card_2:after{
        top:0;
        left: 0;
        border-width: 0 0 0 0;
    }
    .card_2>:first-child:before {
        bottom: 0;
        right: 0;
        border-width: 0 1px 1px 0;
    }
    .card_2>:first-child:after {
        bottom: 0;
        left: 0;
        border-width: 0 0 0 0;
    }
    .card:nth-child(2) .service_title {
        color: crimson
    }
    @media only screen and (min-width: 65.625em) {
        /* Break out main cards into three columns */
        .card_main {
          column-count: 3;
          column-gap: 10px;
          width: 650;
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