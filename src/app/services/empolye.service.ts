import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeService {

  constructor(private http:HttpClient) { }

  addEmpolyee(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/empolyees",data)
  }
  updateEmpolyee(id:number,data:any):Observable<any>{
    return this.http.put(`http://localhost:3000/empolyees/${id}`,data)
  }
  getEmpolyeList():Observable<any>{
    return this.http.get("http://localhost:3000/empolyees")
  }
  deleterEmpolye(id:number):Observable<any>{
  return this.http.delete(`http://localhost:3000/empolyees/${id}`)
  }

}
