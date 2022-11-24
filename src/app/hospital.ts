import { Doctor } from "./doctor";


export class Hospital {
    id:number;
    hospitalname:any;
    facilities:any;
    department:any;
    
    doctorId:any;
  doctorlist!:Doctor
    constructor()
    {
    this.id=0;
    this.hospitalname=null;
    this.facilities=null;
    this.department=null; 
   
    }
}
