import { Component} from "@angular/core";

@Component({
    selector: "app-faq",
    template: `
    <div class="faq_container">
        <h6>Frequently asked questions</h6>
        <h1>Faq</h1>
        <div class="cont">
            <div class="row"> 
                <div class="col">
                    <div class="faq_main" >
                        <div class="accordion" (click)="toggleAccordian($event)"> what is your </div>
                        <div class="panel">
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
            <div class="row"> 
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
      .accordion:after {
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
      }
      
      .panel{
          display: none;
          max-height: 0;
            overflow: hidden;
        transition: max-height 0.2s ease-out;
      }
      .visibleAnswer {
          display: block;
      }
      h6 {
          color: crimson;

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