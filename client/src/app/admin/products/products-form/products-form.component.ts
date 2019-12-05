import { Component, OnInit, Input} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { ProductsStoreService, NotificationService, CategoriesStoreService } from 'src/app/shared';
import { Product } from 'src/app/products/shared';
import { Observable } from 'rxjs';

@Component({
    selector: "products-form",
    templateUrl: "./product-form.component.html",
    styleUrls: ["./products-form.component.css"]
})
export class ProductFormComponent implements OnInit {
    productForm:FormGroup;
    files: Array<File> = [];
    filesObjUrl:any[] = [];
    mouseOverSubmit:boolean;
    @Input() product:Product = null;
    productImagesUrl:any = null;
    categories$:Observable<any>;
    isLoading:boolean = false;
    errorMessage:string = "";

    constructor(
        private formBuilder:FormBuilder, 
        private productsStoreService: ProductsStoreService,
        private notifyService: NotificationService,
        private categoriesStore: CategoriesStoreService,
        private sanitizer: DomSanitizer,
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
    onSelectFile(selectedFiles:any){
        this.files = Array.from(selectedFiles);

        this.files.forEach( (file:File) => {
            let url = URL.createObjectURL(file);
            this.filesObjUrl.push({file, url});
        })
        return;
    }
    removeImage(imageIndex:number){
        const filteredFiles = this.files.filter( (file:File, index:number) => index !==imageIndex );
        const filteredFilesObj = this.filesObjUrl.filter( (file:any, index:number) => index !==imageIndex );

        this.files = filteredFiles;
        this.filesObjUrl = filteredFilesObj;
    }
    removeExistingImage(imageIndex:number){
        const filteredUrl = this.productImagesUrl.filter( (url:any, index:number) => index !==imageIndex );
        
        this.productImagesUrl = filteredUrl;
    }
    // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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
                this.isLoading = false;
            }else
            this.notifyService.showSuccessMessage("Success", message);
            this.isLoading = false;
        })
    }
    editProduct(formData:FormData){
        const images:number = this.files.length + this.productImagesUrl.length;
        if(images > 4){
            this.notifyService.showErrorMessage("Error!", "you cant upload above 4 images");
            this.isLoading = false;
            return;
        }
        const formDataCopy = formData;
        formDataCopy.append('images', JSON.stringify(this.productImagesUrl));

        this.productsStoreService.editProduct(this.product._id, formDataCopy, (err:any, message:string) => {
            if(err){
                this.errorMessage = err;
            }else
            this.notifyService.showSuccessMessage("Success", message);
        })

        this.isLoading = false;
    }

    ngOnInit(){
        if(this.product){
            this.productForm.patchValue(this.product);
            this.productImagesUrl = this.product.images;
        }
        this.getCategories();
    }

    
}