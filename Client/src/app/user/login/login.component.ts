import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required])
});

get emailCtrl():FormControl{
  return this.loginForm.get('email') as FormControl;
}

get passwordCtrl():FormControl{ 
  return this.loginForm.get('password') as FormControl;
} 

errorMessage=''

loginResponse:any

userLogin(){
  this.commonService.userlogin(this.loginForm.value).subscribe({
    next: res=>{
      console.log(res.name.first);
      localStorage.setItem('token',res.data)
      localStorage.setItem('user_id',res.id)
      localStorage.setItem('username',res.name.first)
          
      this.router.navigate(['/user/profile'])
  
    },
    error:err=>{console.log(err.status);
    }
  })

  
//   this.http.post('http://localhost:4000/users/login',this.loginForm.value).subscribe(data => {
//     this.loginResponse=data
//     localStorage.setItem('token',this.loginResponse.data)
//     alert("Login Success")
//     this.router.navigate(['/user/profile'])
// }, error => {
//       if (error.status===404){
//         alert("User Not Found, Please Register")
//         this.router.navigate(['/user/register'])
//       }
//       else if(error.status===400){
//         alert("Please Check Your Email and Password")
//       }
      
// });


}
constructor(private commonService:CommonServiceService, private http:HttpClient,private router:Router){
}

}
