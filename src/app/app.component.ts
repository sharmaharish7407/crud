import { Component ,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmpolyeService } from './services/empolye.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experince','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,private _empservice:EmpolyeService,private core:CoreService){}
  ngOnInit():void{
 this.getEmpolyedata(); 
  }
  openAddEdit(){
    const dialogRef=this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmpolyedata();
        }
      }
    })
  }
  getEmpolyedata(){
    this._empservice.getEmpolyeList().subscribe({next:(res)=>{
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    },
  error:(err)=>{
    console.log(err)
  }})
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmpolye(id:number){
this._empservice.deleterEmpolye(id).subscribe({
  next:(res)=>{
 
    this.core.openSnackBar("Empolye deleted",'done')
    this.getEmpolyedata()
    
  },
  error:console.log
})
  }
  openEditForm(data:any){
 const dialogRef=  this._dialog.open(EmpAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmpolyedata();
        }
      }
    })
  }
}

