import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {

    //auth wale section me account bananan tha or handel karna tha that's why waha account name ka variable tha 
    //yaha ab databas and storage handel karna hai to wo variable name le rahe
    //client to yaha ve bnega

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectid)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createpost({ Title, slug, content, imageid, userid, status, name}) {
        try {            
            
            //go through documentation how to create document and what we need to pass
            return await this.databases.createDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug,     //taking slug as the document id

                //ab data jo ki save karna hai data base me to ye hoga wo
                {
                    Title,
                    content,
                    imageid,
                    userid,
                    status,
                    name
                }
            )
        } catch (error) {
            //debugging will become easy
            console.log("Appwrite::configuration::createpost::", error);
        }
    }

    //document id chaiye na jisko update karna hai to uske liye slug alag se pass kar rahe hai or abki sab chij alag
    async updatedpost(slug, { Title, content, imageid, status }) {
        
        try {
            const updateddocument = await this.databases.updateDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug,
                {
                    Title,
                    content,
                    imageid,        //image id is basically the image which we are storing
                    status,
                }
            )
            return updateddocument;
            
        } catch (error) {
            console.log("Appwrite::configuration::updatepost::", error);
        }
    }



    //now delete document
    async deletepost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug
            )
            return true;        //yaha se bas success ka message vej dena hai
        } catch (error) {
            console.log("Appwrite::configuration::deletepost::", error);
            return false;
        }
    }

    
    //hme koi ek particular post chaiye to getdocument
    async getpost(slug){
        try {
            return await this.databases.getDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug,
            )
        } catch (error) {
            console.log("Appwrite::configuration::getpost::", error);
        }
    }


    //ab hame sare post chaiye to isme document id ki need nahi hai q ki hme sab chaiye
    async getallpost(){
        try {
            return await this.databases.listDocuments(
                config.appwritedatabaseid,
                config.appwritecollectionid,
            )
        } catch (error) {
            console.log("Appwrite::configuration::getallpost::", error);
            return false;       //agar koi post hi nahi hai to
        }
    }


    //ab wo post jo ki active hai to yaha pe query check karna padega ki status active hai if haan then hi wo aaye
    //uske liye hi waha index banaya tha q ki usse key generate hota hai or query me key pass karna hota hai
    async getactivepost(){
        try {
            return await this.databases.listDocuments(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                //ab yaha condition likh sakte hai jo jo qo condition se match krega wo sab list hoga (means aayega)
                //ye array me pass hota hai
                [
                    Query.equal("status", ["active"  /* yaha v or conditions lih sakte hai*/])
                    //yaha or kisi condition  ko v likhna hai  to likh sakte hai
                ]
            )
        } catch (error) {
            console.log("Appwrite::configuration::getactivepost::", error);
            return false;
        }
    }

    


    /**********UPLOAD SERVICE ************/ 

    //documentation create file
    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                config.appwritebucketid,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite::configuration::uploadfile::", error);
            return false;
        }
    }

    //deletefile
    //file id-> jo image daal rahe hai wahi to file hai hamara to uska jo id hoga wahi pass kar denge
    //
    async deletefile(imageid){
        try {
            await this.bucket.deleteFile(
                config.appwritebucketid,
                imageid,
            )
            return true
        } catch (error) {
            console.log("Appwrite::configuration::deletefile::", error);
            return false;
        }
    }

    //file preview
    //async ki need to nahi hai q ki ye direct value vejta hai (see in documentation)

    getfilepreview(imageid){
        try {            
            const filepreview =  this.bucket.getFilePreview(
                config.appwritebucketid,
                imageid,
            )
            return filepreview.href
            
        } catch (error) {
            console.log("Appwrite::configuration::getfilepreview::", error);
            return false;
        }
    }
}





const service = new Service()

export default service; ''