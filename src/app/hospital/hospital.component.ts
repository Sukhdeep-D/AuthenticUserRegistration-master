import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { Hospital } from '../hospital';
import { HospitalService } from '../hospital.service';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  HospitalList:Hospital[]=[];
  doctorlist:Doctor=new Doctor();
  DoctorList:Doctor[]=[]
  newHospital:Hospital=new Hospital();
  submitted: boolean = false;
  saveform!:FormGroup
  constructor(private loginService:LoginService,private fb: FormBuilder,private hospitalService:HospitalService, public doctorService:DoctorService,private route:Router,private toastr:ToastrService) {
    this.saveform = this.fb.group({
      hospitalname: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      facilities:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      department:['',[Validators.required,Validators.maxLength(25), Validators.minLength(3)]],
      doctorId:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
       }) 
   }
  ngOnInit(): void {
    this.getHospitalAll();
    this.getAllDoctors();
  }
  getAllDoctors()
  {
    this.doctorService.getAll().subscribe(
      (response)=>{
        this.DoctorList=response.data;
        console.log(response.data.data)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  getHospitalAll()
  {
    // if(this.saveform.invalid)
    // {
    //   this.submitted=true;
    //   return;
    // }
    if(this.loginService.isAuthenticated())
    {
      this.hospitalService.getAll().subscribe((response)=>{
  
        this.HospitalList=response.data;
        console.log(this.HospitalList)
      },(error)=>{
      console.log(error)
      })
      }
      else
      return
    }

    saveClick()
  {
    debugger
    alert(this.newHospital.doctorId)
    this.hospitalService.saveHospital(this.newHospital).subscribe(
      (response)=>{
        
        this.getHospitalAll();
        this.clearRec();
        console.log(response)
        this.toastr.success("Add Successfully!");
      },
      (error)=>{
        console.log(error);

      }
    )
  }
  clearRec(){
      this.newHospital.hospitalname="";
        this.newHospital.facilities="";
        this.newHospital.department="";
        this.newHospital.doctorId="";
  }
  editClick(hp:any)
  {
    this.newHospital=hp;
  }
  updateClick()
  {
    this.hospitalService.updateHospital(this.newHospital).subscribe(
      (response)=>{
        this.getHospitalAll();
        this.toastr.success("Edited Successfully!");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteClick(id:number)
  {
   debugger;
     this.hospitalService.deleteHospital(id).subscribe(
      (response)=>{
      this.getHospitalAll();
      this.toastr.success("Deleted Successfully!");
      },
      (error)=>{
        console.log(error);
      }
     ) 
  }
  getDoctorId(event:any)
  {
    debugger;
   
     this.newHospital.doctorId=event.target.value;
     this.doctorlist.id=event.target.value;

  } 
}