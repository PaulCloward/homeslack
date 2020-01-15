export class PropertyImage{

    user:string;
    image_url:string;
    seller_description?:string;

    constructor(userID:string, image_url:string){
        this.user = userID;
        this.image_url = image_url;
    }
}