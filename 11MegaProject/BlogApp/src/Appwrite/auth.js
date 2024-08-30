import config from "../config/config";
import {Client, Account, ID} from "appwrite";


//ye jab koi access krega then usko waha ek object bna ke sab feature likhna padega so uske badle yah ahi sab bna ke export krte hai

export class Authservice {
    client = new Client();
    account;


    //hum phale v accounnt ki value set kr sakte the but nahi kiye q ki wo wastage of space hai so ab jab client form hoga then hi account bnega
    constructor(){
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectid)
        this.account = new Account(this.client)
    }


    //ab mere pas promise aayega to usko async and await se handel kar rahe hai
    async createaccount(email, password, name){        
        try {            
            //isme phale unique id then email and then password hi jata hai uske baad jo vejna hai vej do
            const useraccount = await this.account.create(ID.unique(), email, password, name)
                //hear we will call another method that if user account created succefully then direct go inside the blog insted of login again
                //const user =  this.login({email, password});
                return useraccount;
            
        } catch (error) {
            console.log("Appwrite::auth::createaccount::", error);
        }
    }


    async login({email, password}) {
        try {            
            //see in documentation q ki hamesha ye change hota hai
            const user = await this.account.createEmailPasswordSession(email, password);            
            return user;
        } catch (error) {
            console.log("Appwrite::auth::login::", error);
        }
    }

    async getcurrentuser(){
        try {
            const response =  await this.account?.get();
            return response
        } catch (error) {
            console.log("Appwrite::auth::getcurrentuser::", error);
            return null
        }
    }

    //jais login pe create session krte hai waise hi logout pe simply delete session kar dete hai

    async logout(){
        try {
            return await this.account.deleteSessions()      //ek deletesession hota hai jisse sirf current session delete hota hai but in this case sare hi session delete ho jayenge
        } catch (error) {
            console.log("Appwrite::auth::logout::", error);
        }
    }
}

const authservice = new Authservice();

//authservice is a object so all the methods are directly accesssable and we are returning that service

export default authservice          //const wala vej rahe hai jo ki ek object bna ke hi vej rahe hai