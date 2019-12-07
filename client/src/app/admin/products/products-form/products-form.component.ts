import { Component, OnInit, Input, OnDestroy} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { ProductsStoreService, NotificationService, CategoriesStoreService } from "../../../shared" //'src/app/shared';
import { ProductService } from "../../../products/shared" //'src/app/products/shared';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: "products-form",
    templateUrl: "./product-form.component.html",
    styleUrls: ["./products-form.component.css"]
})
export class ProductFormComponent implements OnInit, OnDestroy {
    productForm:FormGroup;
    files: Array<File> = [];
    filesObjUrl:any[] = [];
    mouseOverSubmit:boolean = false;
    @Input() product:any = null;
    productImages:any = null;
    categories$:Observable<any> | undefined
    productsServiceSub:Subscription | undefined;
    isLoading:boolean = false;
    errorMessage:string = "";

    constructor(
        private formBuilder:FormBuilder, 
        private productsStoreService: ProductsStoreService,
        private notifyService: NotificationService,
        private categoriesStore: CategoriesStoreService,
        private sanitizer: DomSanitizer,
        private productService: ProductService
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
    removeExistingImage(imageId:string){
        const filteredImages = this.productImages.filter( (image:any, index:number) => image.id !== imageId );
        this.productImages = filteredImages;
        this.productsServiceSub = this.productService.deleteProductImage(this.product._id, imageId)
        .subscribe(data => this.notifyService.showSuccessMessage("Success", data.message));
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
        const images:number = this.files.length + this.productImages.length;
        if(images > 4){
            this.notifyService.showErrorMessage("Error!", "you cant upload above 4 images");
            this.isLoading = false;
            return;
        }
        const formDataCopy = formData;
        formDataCopy.append('images', JSON.stringify(this.productImages));

        this.productsStoreService.editProduct(this.product._id, formDataCopy, (err:any, message:string) => {
            if(err){
                this.errorMessage = err;
                this.isLoading = false;
            }else
            this.notifyService.showSuccessMessage("Success", message);
            this.isLoading = false;
        })
    }

    ngOnInit(){
        if(this.product){
            this.productForm.patchValue(this.product);
            this.productImages = this.product.images;
        }
        this.getCategories();
    }
    ngOnDestroy(){
        if(this.productsServiceSub)
            this.productsServiceSub.unsubscribe();
    }
    
}