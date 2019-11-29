import { Component, OnInit, Input} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsStoreService, NotificationService, CategoriesStoreService } from 'src/app/shared';
import { Product } from 'src/app/products/shared';
import { Observable } from 'rxjs';

@Component({
    selector: "products-form",
    templateUrl: "./product-form.component.html",
    styles: [`
        em {
            color:crimson;
            float:right;
        }
    `]
})
export class ProductFormComponent implements OnInit {
    productForm:FormGroup;
    files: Array<File> = [];
    mouseOverSubmit:boolean;
    @Input() product:Product;
    categories$:Observable<any>;
    isLoading:boolean = false;
    errorMessage:string = "";

    constructor(
        private formBuilder:FormBuilder, 
        private productsStoreService: ProductsStoreService,
        private notifyService: NotificationService,
        private categoriesStore: CategoriesStoreService
        ){
            this.productForm = this.initForm(this.formBuilder)
    }

    initForm(formBuilder: FormBuilder){
        return formBuilder.group({
         name: ['', Validators.required],
         price: ['', Validators.required],
         discountedPrice: [''],
         quantity: ['', Validators.required],
         brand: ['', Validators.required],
         category: ['', Validators.required],
         description: ['', Validators.required],
         attributes: formBuilder.group({
             processor: [''],
             ram: [''],
             size: [''],
         }),
        })
    }
    getCategories(){
        this.categories$ = this.categoriesStore.getCategories();
    }
    onSelectFile(event:any){
        if(event.target.files && event.target.files.length)
            this.files = event.target.files
    }
    onSubmit(){
        this.isLoading = true;
        
        const product = Object.assign({}, this.productForm.value)
        let formData = this.populateFormData(product);
        this.product ? this.editProduct(formData) : this.addProduct(formData)
        
    }
    populateFormData(product:any){
        let formData = new FormData();

        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("discountedPrice", product.discountedPrice);
        formData.append("quantity", product.quantity);
        formData.append("brand", product.brand);
        formData.append("category", product.category);
        formData.append("description", product.description);
        formData.append("attributes", JSON.stringify(product.attributes));

        if(this.files.length >= 1){
            for(let file of this.files){
                formData.append("image", file)
            }
        }

        return formData;
    }
    addProduct(formData:FormData){
        this.productsStoreService.addProduct(formData, (err:any, message:string) => {
            if(err){
                this.errorMessage = err;
            }else
            this.notifyService.showSuccessMessage("Success", message);
        })

        this.isLoading = false;
    }
    editProduct(formData:FormData){
        this.productsStoreService.editProduct(this.product._id, formData, (err:any, message:string) => {
            if(err){
                this.errorMessage = err;
            }else
            this.notifyService.showSuccessMessage("Success", message);
        })

        this.isLoading = false;
    }

    ngOnInit(){
        if(this.product){
            this.productForm.patchValue(this.product)
        }
        this.getCategories();
    }

    
}