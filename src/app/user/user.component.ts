import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Register } from '../register';
import { RegisterService } from '../register.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  SearchCountryField = SearchCountryField;
  
  separateDialCode = false;
	
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates];
  emailAlredyExist = "";
  submitted: boolean = false;
register:Register=new Register();
@ViewChild('model') model: any;
@ViewChild('modal') modal: any;
saveform!: FormGroup
  constructor(private registerService:RegisterService,private router:Router,private fb: FormBuilder) { 
    this.saveform = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      username:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      streetAddress:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
city:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
state:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
email:['',[Validators.required,Validators.email,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
postalCode:['',[Validators.required,Validators.pattern("[0-9]{6}")]],
password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],  
phoneNumber:['',[Validators.required]]    
    }) 
  }

  ngOnInit(): void {
    this.model.show();
    this.modal.show();
  }


  registerClick()
  {
    debugger
    if (this.saveform.invalid) // true if any form validation fail
    {
      this.submitted = true;
      return;
    }
    this.saveform.value.phoneNumber =this.saveform.value.phoneNumber.internationalNumber
    //this.saveform.value.phoneNumber=this.saveform.value.phoneNumber.replace(/^(\d{0,3})(\d{0,3})/, '');;
 console.log(this.saveform.value.phoneNumber)


debugger
   this.registerService.RegUser(this.saveform.value).subscribe(
    (response)=>{
    
     
     this.emailAlredyExist=JSON.stringify(response.email)
     console.log(this.emailAlredyExist)
     if(!this.emailAlredyExist)
     {
    
      alert("You have register Successfully")
      this.router.navigateByUrl("/home");
     }
     else
     {
     
      alert("Email Already Exist,Kindly Login with User Name")
      
     }
        
       },
      
    
   
    (error)=>{
      
    
console.log(error)

    }
   )
    
  }
  get name()
  {
return this.saveform.get('name');
  }
  get username()
  {
return this.saveform.get('username');
  }
  get streetAddress()
  {
return this.saveform.get('streetAddress');
  }
  get state()
  {
return this.saveform.get('state');
  }
  get city()
  {
return this.saveform.get('city');
  }
  get email()
  {
return this.saveform.get('email');
  }
  get postalCode()
  {
return this.saveform.get('postalCode');
  }
  get password()
  {
return this.saveform.get('password');
  }
}
