import { Component } from "@angular/core";

@Component({
    selector: "app-clients",
    template: `<section class="container-fluid clients_container">
        <h4>WHAT CLIENTS SAY? </h4>
        <div class="comment_main"> 
            <div class="comment"> 
                <p> Bootstrap’s carousel class exposes two events for 
                hooking into carousel functionality. Both events have the following additional properties:</p>
                <div class="client">
                    <img src="/assets/images/988.JPG" alt="clint" />
                    <div>
                        <div class="name">Denky Ogbonnaya </div>
                        <span class="occupation">Client </span>
                    </div>
                    
                </div>
            </div>
            <div class="comment"> 
                <p> Bootstrap’s carousel class exposes two events for 
                hooking into carousel functionality. Both events have the following additional properties:</p>
                <div class="client">
                    <img src="/assets/images/988.JPG" alt="clint" />
                    <div>
                        <div class="name">Denky Ogbonnaya </div>
                        <span class="occupation">Client </span>
                    </div>
                    
                </div>
            </div>
            <div class="comment"> 
                <p> Bootstrap’s carousel class exposes two events for 
                hooking into carousel functionality. Both events have the following additional properties:</p>
                <div class="client">
                    <img src="/assets/images/988.JPG" alt="clint" />
                    <div>
                        <div class="name">Denky Ogbonnaya </div>
                        <span class="occupation">Client </span>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </section>`,
    styles: [`
        .clients_container {
            display: flex;
            flex-direction: column;
            justif-items: center;
            background: #777777;
        }
        .comment_main {
            column-count: 1;
            column-gap: 10px;
            padding: 5px;
        }
        .client {
            display: flex;
            flex-direction: row;
        }
        .client >div {
            display: flex;
            flex-direction: column
        }
        .name {
            font-weight: bold;
            font-size: 14px
        }
        .occupation {
            color: grey;
            font-size: 14px
        }
        p {
            font-size: 12px;
        }
        h4 {
            text-align: center;
            font-weight:bold;
            color: crimson
        }
        img {
            width: 50px;
            height: 50px;
            border-radius: 100%;
            margin rigth: 2px;
        }
        .comment {
            background: #212121;
            color: #ffffff;
            padding: 10px;
        }
        @media only screen and (min-width: 65.625em) {
            /* Break out main cards into three columns */
            .comment_main {
              column-count: 3;
              column-gap: 10px;
              margin: 10px auto 10px auto;
              padding: 10px;
            }
            .comment {
                width: 300px;
            }
        }
    `]
})

export class ClientsComponent {

}