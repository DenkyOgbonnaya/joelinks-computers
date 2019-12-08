import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
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
    @Input() user:any | undefined;
    loading:boolean = false;
    mouseOverProceed:boolean | undefined;
    errorMessage:string = "";
    cartSub: Subscription | undefined;

    checkoutForm:FormGroup;
    

    constructor(
        private activeModal: NgbActiveModal, 
        private cartService: CartService,
        private formBuilder: FormBuilder
    ){
        this.checkoutForm = this.initForm(this.formBuilder);
    }

    closeModal() {
        this.activeModal.close();
    }
    dismissModal(){
        this.activeModal.dismiss();
    }
    checkout(){
        this.loading = true;
        this.cartSub = this.cartService.checkout(this.checkoutForm.value, this.user._id)
        .subscribe(
            (data:any) => {
                this.activeModal.close();
                window.location.href = data.authUrl;
            },
            (err:any) => {
                this.loading = false;
                this.errorMessage = err;
            }
        )
        
    }

    initForm(formBuilder:FormBuilder){
        return formBuilder.group({
            email: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
        })
    }

    ngOnInit(){
        if(this.user){
            this.checkoutForm.patchValue(this.user.profile);
        }
    }
    ngOnDestroy(){
        if(this.cartSub)
            this.cartSub.unsubscribe();
    }
}