import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CartService } from "../../shared";
import { Subscription } from "rxjs";

@Component({
    selector: "cart-checkout",
    templateUrl: "./checkout.component.html",
    styles: [`
        .modal-header {
            background: #424242;
            color: #ffffff;
        }
        em {
            color:crimson;
            float:right;
        }
    `]
})

export class CheckoutComponent implements OnInit, OnDestroy {
    @Input() user:any;
    loading:boolean = false;
    mouseOverProceed:boolean;
    errorMessage:string = "";
    cartSub: Subscription;

    checkoutForm:FormGroup;
    name:FormControl;
    email:FormControl;
    phone:FormControl;
    address:FormControl
    city:FormControl;
    state:FormControl
    firstname:FormControl;
    lastname:FormControl

    constructor(private activeModal: NgbActiveModal, private cartService: CartService){
        
    }

    closeModal() {
        this.activeModal.close();
    }
    checkout(){
        this.loading = true;
        this.cartSub = this.cartService.checkout(this.checkoutForm.value, this.user._id)
        .subscribe(
            data => {
                this.activeModal.close();
                window.location.href = data.authUrl;
            },
            err => {
                this.loading = false;
                this.errorMessage = err;
            }
        )
        
    }

    initForm(){
        const{firstname, lastname, phone, address, city, state} = this.user.profile;

        this.email = new FormControl(this.user.email, Validators.required);
        this.phone = new FormControl(phone || '', Validators.required);
        this.address = new FormControl(address || '', Validators.required);
        this.city = new FormControl(city || '', Validators.required);
        this.state = new FormControl(state || '', Validators.required);
        this.firstname = new FormControl(firstname || '', Validators.required);
        this.lastname = new FormControl(lastname || '', Validators.required);


        this.checkoutForm = new FormGroup({
            email: this.email,
            phone: this.phone,
            address: this.address,
            city: this.city,
            state: this.state,
            firstname: this.firstname,
            lastname: this.lastname
        })
    }

    ngOnInit(){
        this.initForm();
    }
    ngOnDestroy(){
        if(this.cartSub)
        this.cartSub.unsubscribe();
    }
}