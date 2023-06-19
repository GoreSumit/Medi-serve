import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  registerForm = new FormGroup({
    firstname:new FormControl('',[Validators.required]),
    lastname:new FormControl('',),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    age:new FormControl('')

  });

  get firstnameCtrl():FormControl{
    return this.registerForm.get('firstname') as FormControl;
  }
  get emailCtrl():FormControl{
    return this.registerForm.get('email') as FormControl;
  }
  
  get passwordCtrl():FormControl{ 
    return this.registerForm.get('password') as FormControl;
  } 




  registerUser(){
    this.commonService.registerUser(this.registerForm.value).subscribe(res=>{
      this.registerForm.setValue({
        firstname:null,
        lastname:null,
        email:null,
        password:null,
        age:null
      })
      alert("User Created Successfully")
      console.log(res);
      this.router.navigate(['/login'])
      
    })
    console.log(this.registerForm.value);
    
    
  }
constructor(private commonService:CommonServiceService, private router:Router){}
}
