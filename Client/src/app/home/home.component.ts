import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  medicines$ = this.commonService.getMedicines().pipe(map(i => { return i}));
  users$=this.commonService.getAllUsers().pipe(map(i => { return i}));
  constructor(private commonService:CommonServiceService){

    

  }

}
