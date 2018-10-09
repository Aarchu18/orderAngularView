import { Injectable } from '@angular/core';
import { OrderModel } from './order-model';
import { HttpClient,HttpHeaders} from '@angular/common/http'

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ListService {
  selectedOrder:OrderModel;
  order: OrderModel[];
  orderId:any;
  httpOptions={
  headers:new HttpHeaders({'content-type':'application/json'})
}
id:number;
setId(id){
this.id=id
}
getId(){
  return this.id;
}
  getOrderID() {
    return this.orderId;
    
  }

  constructor(private http:HttpClient) { }
  deleteOrderList(id:number):Observable<any>
  {
    debugger
    return this.http.delete("https://localhost:44368/api/OrderMasters" + id).pipe(map(data=>data));
  }
  putOrderList(id,order):Observable<any>
  {
    debugger
    return this.http.put("https://localhost:44368/api/OrderMasters" + id, order)
  }
}
