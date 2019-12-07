import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ContactUsService } from './shared/contact-us.service';
import { NotificationService } from '../shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnDestroy {
  @Input() pageName:string= "Contact Us";
  name:string = "";
  subject:string = "";
  email:string = "";
  message:string = "";
  mouseOverSend:boolean = false;
  errorMessage:string = "";
  isLoading:boolean = false;
  contactSub: Subscription | undefined;
  constructor(private contactService: ContactUsService, private notify: NotificationService) { }

  sendMail(mailData:string){
    this.isLoading = true;
    this.errorMessage = "";
    
    this.contactSub = this.contactService.sendMail(mailData)
     .subscribe(
      (data:any) => {
        this.notify.showSuccessMessage("Succes", data.message);
        this.isLoading = false;
      },
      (err:any) => {
        this.errorMessage = err;
        this.isLoading = false;
      }
    )

  }
  ngOnDestroy() {
    if(this.contactSub)
      this.contactSub.unsubscribe();
  }

}
