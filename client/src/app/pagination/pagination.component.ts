import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html",
    styles: [`
        .active>a {
            background: crimson;
            border: 1px solid #ccc;
            color: #ffffff;
        }
        li, li a {
            color: crimson;
        }
    `]

})
export class PaginationComponent implements OnInit {
    @Input() pages:number = 0;
    @Input() currentPage:number = 1;
    pageNumbers:number[] = [];
    @Output() pageChanged = new EventEmitter<number>();

    changePage(event:Event, pageNumber:number){
        event.preventDefault();
        this.pageChanged.emit(pageNumber);
    }
    ngOnInit(){
        if(this.pages >=1){
            for(let pageNumber =1; pageNumber<=this.pages; pageNumber+=1){
                this.pageNumbers.push(pageNumber)
            }
        }
    }
}