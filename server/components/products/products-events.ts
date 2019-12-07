import event from "events";
import productsController from "./products-controller";

const{releaseReservations, returnProducts} = productsController;

const productsEvents = new event.EventEmitter();

productsEvents.on("releaseReservations", releaseReservations);
productsEvents.on("returnProducts", returnProducts);
productsEvents.on("deleteImage", (imageId:string, uploader:any) => {
    if(imageId){
        uploader.destroy(imageId, (err:any) => {
            if(err){
                console.log(err);
            } 
        })
    }
})

export default productsEvents;