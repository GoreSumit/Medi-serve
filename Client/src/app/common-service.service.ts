import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

isLoggedIn(){
  return !!localStorage.getItem('token')
}




logoutUser(){
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('username')
  this.router.navigate(['/user/login'])
}


  constructor(private http:HttpClient, private router:Router) { }




  userlogin(data:any):Observable<any>{
     return this.http.post<any>(`http://localhost:4000/users/login`, data);
  }
  registerUser(data:any):Observable<any>{
    return this.http.post(`http://localhost:4000/users`, data);
  }

  getMedicines():Observable<any>{
    return this.http.get(`http://localhost:4000/medicines`)
  }
  getMedicinesByUser(id:any):Observable<any>{
    return this.http.get(`http://localhost:4000/users/${id}/medicines`)
  }

  getAllUsers():Observable<any>{
    return this.http.get(`http://localhost:4000/users/`)
  }

  postMedicines(data:any):Observable<any>{
    return this.http.post(`http://localhost:4000/medicines`,data)
  }
  delMedicine(data:any):Observable<any>{
    return this.http.delete(`http://localhost:4000/medicines/${data}`)
  }
  updateMedicine(id:any,data:any):Observable<any>{    
    return this.http.patch(`http://localhost:4000/medicines/${id}`,data)
  }


  // handleError(error:HttpErrorResponse){
  //   let errorMessage ='';
  //   if(error.status===0){
  //     //client error
  //     errorMessage = ` Some error occured: ${error}`;
  //   }
  //   else{
  //     //server side error
  //     errorMessage = `Error Status: ${error.status} Message:${error.message}`
  //   }

  //   return throwError(()=>errorMessage)

  // }
}
