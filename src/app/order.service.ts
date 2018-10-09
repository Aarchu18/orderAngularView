import { Injectable } from '@angular/core';
import { OrderModel } from './order-model';
import { HttpClient,HttpHeaders} from '@angular/common/http'

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Orderlist} from 'src/app/orderlist';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  order: OrderModel[];
  httpOptions={
  headers:new HttpHeaders({'content-type':'application/json'})
}
  

  constructor(private http:HttpClient) { }
  postOrderList(OrderList: Orderlist):Observable<any> {
    debugger
   
    
    console.log("postordesdfjfsdgvr",JSON.stringify(OrderList.order))
 
    return this.http.post('https://localhost:44368/api/OrderMasters', OrderList.order);

  }
  
  getOrderList():Observable<any>
  {
    return this.http.get('https://localhost:44368/api/OrderMasters').pipe(map(data=>data));
    
  }

}
