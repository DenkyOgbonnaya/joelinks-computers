import event from "events";
import productsController from "./products-controller";

const{releaseReservations, returnProducts} = productsController;

const productsEvents = new event.EventEmitter();

productsEvents.on("releaseReservations", releaseReservations);
productsEvents.on("returnProducts", returnProducts);

export default productsEvents;