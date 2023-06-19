import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, filter, map, throwError } from 'rxjs';
import { CommonServiceService } from 'src/app/common-service.service';
import { Medicines } from 'src/app/models/medicines';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  medicinesData: Medicines[] = [];
  filteredMedicines: Medicines[] = this.medicinesData;
  userId = localStorage.getItem('user_id')

  medicines$ = this.commonService.getMedicinesByUser(this.userId).pipe(map(i => {
    this.medicinesData = i.data.map((m: Medicines) => {
      m.isEdit = false;
      return m;
    });
    this.filteredMedicines = i.data
    console.log(this.medicinesData);
    return i

  }),
    catchError(error => {
      return throwError(() => error)
    })

  )

  flag = false;






  getMedId(data: any) {
    this.flag = true
    this.medicineForm.setValue({
      name: data.name,
      price: data.price,
      exp: data.exp
    })
    this.medID = data._id
    console.log(this.medID);

  }

  medID = ''



  medicineForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    exp: new FormControl('', [Validators.required])
  })

  AddMedButton() {
    this.medicineForm.setValue({
      name: null,
      price: null,
      exp: null
    })
    this.flag = false;
  }



  alert!: boolean;
  addSuccess!: string;

  addMedicine() {
    if (this.flag) {
      this.commonService.updateMedicine(this.medID, this.medicineForm.value).subscribe({
        next: res => {
          console.log(res)
          this.alert = true
          this.addSuccess = res.message;
          this.medicines$ = this.commonService.getMedicinesByUser(this.userId).pipe(map(i => {
            this.medicinesData = i.data
            this.filteredMedicines = i.data
            return i

          }))
        },
        error: err => { console.log(err); }
      })
      this.alert = false;

    }
    else {
      this.commonService.postMedicines(this.medicineForm.value).subscribe({
        next: res => {
          console.log(res.data)
          this.alert = true
          this.addSuccess = res.message;
          this.filteredMedicines.push(res.data)
          console.log(this.filteredMedicines);
        },
        error: err => { console.log(err); }
      }
      )
      this.alert = false;


    }


  }


  deleteMedicine(id: any) {
    if (confirm("Are You Sure?")) {
      this.commonService.delMedicine(id).subscribe(
        {
          next: res => {
            this.alert = true
            this.addSuccess = "Medicine Deleted";
            this.filteredMedicines = this.filteredMedicines.filter(medicine => {
              return medicine._id !== id
            })


          }
          // ,
          // error: err => {
          //   console.log(err);

          // }
        })
      this.alert = false;

    }
  }

  constructor(private commonService: CommonServiceService, private router: Router) { }



  updateMedicine(data: Medicines) {
    console.log(data);
    this.commonService.updateMedicine(data._id, data).subscribe({
      next: res => {
        console.log(res)
        this.alert = true
        this.addSuccess = res.message;
        this.medicines$ = this.commonService.getMedicinesByUser(this.userId).pipe(map(i => {
          this.medicinesData = i.data
          this.filteredMedicines = i.data
          return i

        }))
      },
      error: err => { console.log(err);
       }
    })
    this.alert = false;

  }

  medicineArray: Medicines[] = this.filteredMedicines
  onedit(medicine: any) {
    medicine.isEdit = true
  }





}
