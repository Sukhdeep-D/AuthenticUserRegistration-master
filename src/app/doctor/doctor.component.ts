import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounce } from 'rxjs';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {


  
  DoctorList:Doctor[]=[];
  newDoctor:Doctor=new Doctor();
  saveform!: FormGroup
  submitted: boolean = false;
  constructor(private doctorService:DoctorService,private toastr:ToastrService,private router:Router,private loginService:LoginService,private fb:FormBuilder) 
  {
    this.saveform = this.fb.group({
      doctorname: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      qualification:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      expierence:['',[Validators.required,Validators.maxLength(25), Validators.minLength(3)]],
      specialisedIn:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
     state:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
   })
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll()
  {
     this.doctorService.getAll().subscribe(
      (response)=>{
        this.DoctorList=response.data;
        // console.log(this.DoctorList)
      },
      (error)=>{
        console.log(error);
      }
    )
  }

saveClick()
{
  this.doctorService.saveDoctor(this.newDoctor).subscribe(
    (response)=>{
      this.getAll();
      this.clearRec();
      console.log(response)
      this.toastr.success("Add Successfully!");

    },
    (error)=>{      
      console.log(error);
    }
  )
}

clearRec()
{
    this.newDoctor.doctorname="";
    this.newDoctor.expierence="";
    this.newDoctor.qualification="";
    this.newDoctor.specialisedIn="";
}

editClick(hp:any)
{
  this.newDoctor=hp;
}

updateClick()
{
    this.doctorService.updateDoctor(this.newDoctor).subscribe(
    (response)=>{
      this.getAll();
      this.toastr.success("Edited Successfully!");

    },
    (error)=>{
      console.log(error);
    }
  )
}
deleteClick(id:number)
  {
   this.doctorService.deleteDoctor(id).subscribe(
      (response)=>{
      this.getAll();
      this.toastr.success("Deleted Successfully!");

      },
      (error)=>{
        console.log(error); 
      }
     ) 
  }
}
