import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpolyeService } from '../services/empolye.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{

  empForm:FormGroup;
education:string[]=[
  "Matrix",
  "Dipolma",
  "Intermediate",
  "Graduation",
  "PostGraduate",
];
constructor(private fb:FormBuilder,private emp:EmpolyeService,private _dialogref:MatDialogRef<EmpAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private core:CoreService){
  this.empForm=this.fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experince:'',
    package:'',
  
  })
}
ngOnInit(): void {
  this.empForm.patchValue(this.data)
}
onformsubmit(){
  if(this.empForm.valid){
    if(this.data){
      this.emp.updateEmpolyee(this.data.id,this.empForm.value).subscribe({next:(val:any)=>{
     
        this.core.openSnackBar('Empolyee updated succesfully','done')
        this._dialogref.close(true)
      },
    error:(err:any)=>{
      console.log(err)
    }}) 
    }
  else{
    this.emp.addEmpolyee(this.empForm.value).subscribe({next:(val:any)=>{
      this.core.openSnackBar('Empolyee added succesfully','done')
      this._dialogref.close(true)
    },
  error:(err:any)=>{
    console.log(err)
  }}) 
  }
 
}

}
}