import { Component } from "@angular/core";

@Component({
    selector: "app-team",
    template: `
    <div class="team_container">
    <div class= "team_intro">WORKING TEAM </div>
    <h3>Meat our team </h3>
    <div class="card_main">
        <div class="card">
            <img src="/assets/images/190.JPG" class="card_img" />
                <div class="name"> Dennis Ogbonnaya</div>
                <div class="position">Cheif Executive Officer</div>
        </div>
        <div class="card">
            <img src="/assets/images/988.JPG" class="card_img" />
                <div class="name"> Denky Ogbonnaya</div>
                <div class="position">Software Developer</div>
        </div>
        <div class="card">
            <img src="/assets/images/190.JPG" class="card_img" />
                <div class="name"> Dennis Ogbonnaya</div>
                <div class="position">Sales representative</div>
        </div>
        <div class="card">
            <img src="/assets/images/988.JPG" class="card_img" />
                <div class="name"> Dennis Ogbonnaya</div>
                <div class="position">Marketing & Delivery</div>
        </div>
        
    </div>

</div>
    `,
    styles: [`
    .team_container {
        display: flex;
        flex-direction: column;
        justif-items: center;
        background: #212121;
        
    }
    .team_intro, h3 {
        text-align: center;
    }
    h3 {
        color: #ffffff;
    }
    .team_intro {
        color:crimson;
        font-weight: bold;
    }
    .card_main {
        column-count: 2;
        column-gap: 2px;
        margin: 20px;
        padding: 0px 15px 15px 15px;
    }
    .card {
        max-width: 150px;
        width:140px;
        background: #212121;
        margin-bottom: 5px;
        border-top: 1px solid crimson;
    }
    .card:hover {
        cursor: pointer;
    }
    .card_img {
        width: 138px;
        heigth: 100px
    }
    .name, .position {
        font-size: 10px;
    }
    .name {
        padding: 10px 10px 0px 10px;
        font-weight: bold;
        color: #ffffff;
    }
    .position {
        padding: 0px 10px 10px 10px;
        color:crimson;
    }
     
    @media only screen and (min-width: 65.625em) {
        /* Break out main cards into three columns */
        .card_main {
          column-count: 4;
          column-gap: 10px;
          width: 650;
          margin: 10px auto 10px auto;
        }
        .card {
            max-width: 130px;
            heigth:100px
        }
        .card_img {
            width: 128px;
            height: 110
        }
    }
    
    `]
})

export class TeamComponent {

}