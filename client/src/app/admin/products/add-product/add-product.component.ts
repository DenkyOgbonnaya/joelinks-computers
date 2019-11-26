import { Component } from "@angular/core";

@Component({
    template: `
        <div class="add_container">
        <h4>Add a new Product</h4>
        <products-form > </products-form>
        </div>
    `,
    styles: [`
        .add_container {
            padding: 10px;
        }
        h4 {
            color: crimson;
        }
    `]
    
})
export class AddProductComponent {
    
}