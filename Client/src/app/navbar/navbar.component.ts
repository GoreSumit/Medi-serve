import { Component } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isLoggedIn(){
    this.username=localStorage.getItem('username')
    return this.commonService.isLoggedIn()
  }

  username!:string|null
  logout(){
    return this.commonService.logoutUser()
    
  }

  constructor(private commonService:CommonServiceService){
    console.log(this.commonService.isLoggedIn());
    
         
  }
}
