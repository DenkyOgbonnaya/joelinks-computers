import { Component} from "@angular/core";

@Component({
    selector: "app-faq",
    template: `
    <div class="faq_container">
        <h5>Frequently asked questions</h5>
        <h1>Faq</h1>
        <div class="cont">
            <div class="row"> 
                <div class="col">
                    <div class="faq_main" >
                        <div class="accordion" (click)="toggleAccordian($event)">What is Joelinks computers? </div>
                        <div class="panel">
                            <small>
                            Joelinks computers is a business in Abakaliki, Ebonyi state. That specializes in the sales, maintenance and services of all computer
                            accessories and office equipments like laptops, desktops, printers etc.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="faq_main" >
                        <div class="accordion" (click)="toggleAccordian($event)">Where is it located?</div>
                        <div class="panel"  >
                            <small>
                            Joelinks computers Nig is located in the heart of Abakaliki the Ebonyi state capital at N0 7 Water Works road Abakiliki, first floor. Beside
                            Mr Biggs, opposite Abakaliki post office. 
                            </small>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="row"> 
            <div class="col">
            <div class="faq_main" >
                <div class="accordion" (click)="toggleAccordian($event)"> Do you do door delivery? </div>
                <div class="panel"  >
                    <small>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea
                    </small>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="faq_main" >
                <div class="accordion" (click)="toggleAccordian($event)"> what is your </div>
                <div class="panel"  >
                    <small>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea
                    </small>
                </div>
            </div>
        </div>
            </div>
        </div>

    
    </div>`,
    styles: [`
    .faq_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        background: whitesmoke;
        padding-top: 20px;
    }
    
    .faq_main {
        width: 250px;
        border: 1px solid #ccc;
        background: #ffffff;
        padding: 5px;
        margin-bottom: 10px;
    }
    
      .accordion {
        padding: 18px;
        width: 240px;
        text-align: left;
        background: #ffffff;
        color: #212121;
        height: 25px;
        font-weight: bold;
        padding:0px;
        font-size: 12px;
        transition: 0.4s;
      }
      .accordion:hover {
          cursor: pointer;
      }
      /*.accordion:after {
        content: '+';
        font-weight: bold;
        font-size: 20px;
        padding-left: 150px;
      }
      .active:after {
        content: '-';
        font-weight: bold;
        font-size: 20px;
        padding-left: 150px;
      }*/
      
      .panel{
          display: none;
          max-height: 0;
            overflow: hidden;
        transition: max-height 0.2s ease-out;
      }
      .visibleAnswer {
          display: block;
      }
      h5 {
          color: crimson;
          font-weight: bold;

      }
    `]
})

export class FaqComponent {
    isVisible:boolean = false;
    
    toggleAccordian(event) {
        let questionelement = event.target;
        let answerElement = questionelement.nextElementSibling;
        
        this.toggleIsVisible();
        questionelement.classList.toggle("active");
        if(this.isVisible){
            answerElement.classList.add("visibleAnswer");
        }else{
            answerElement.classList.remove("visibleAnswer");
        }
        this.toggleIsVisible();
        if (answerElement.style.maxHeight) {
            answerElement.style.maxHeight = null;
          } else {
            answerElement.style.maxHeight = answerElement.scrollHeight + "px";
          }
       
    }
    toggleIsVisible(){
        this.isVisible = !this.isVisible;
    }
}