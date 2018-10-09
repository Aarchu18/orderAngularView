import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/client.service';
import { ItemService } from 'src/app/item.service';
import { ClientModel } from 'src/app/client-model';
import { ItemModel } from 'src/app/item-model';
import { OrderModel } from 'src/app/order-model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import {Serialize, SerializeProperty, Serializable} from 'ts-serializer';
import { Title } from '../../../node_modules/@angular/platform-browser';
import {DatePipe} from '@angular/common'
import { Orderlist } from 'src/app/orderlist';


@Serialize({})



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public now:Date =new Date();
  submitted = false;
  registerForm: FormGroup;
  selectedClient: any = [];
  public clientList: any = [];
  public itemList: any = [];
  clientNameList: any = [];
  clientIDList:any =[];
  itemNameList: any = [];
  //orderList = new Orderlist();
  orderList:any =[];
  clientID:number; 
  itemID:number;
  
  constructor(private routes:Router, private title:Title,private builder: FormBuilder, private itemService: ItemService, private clientService: ClientService, private orderService: OrderService) {
    this.registerForm = builder.group({
      ClientName: ['', Validators.required],
      ItemName: ['', Validators.required],
      Quantity: ['', Validators.required],
      OrderDate:['',Validators.required]
    })
    // setInterval(() =>{
    //   debugger;
    //   this.OrderDate = new Date();
    

    // },1);
    this.title.setTitle("Order Management Add Order Details");
  }
  clientName:string;
  itemName:string;
  public onOptionsSelected(event): void {
   // debugger  // event will give you full breif of action
    this.clientID = event.clientId;
    this.clientName = event.clientName;
    console.log("suc"+this.clientName);
    
   console.log("success"+ this.clientID);
   
  }
  public onOptionsItemSelected(event): void {
    //debugger  // event will give you full breif of action
    this.itemID = event.itemId;
    this.itemName = event.itemName;
    console.log("nma"+this.itemName);
    
   console.log("successItem"+this.itemID);
   
  }


  get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.clientService.getClient().subscribe(clientdata => {
      this.clientList = clientdata
      console.log("updatedclientList",this.clientList)
      // console.log("clientList"+JSON.stringify(this.clientList));
      this.clientList.forEach(client => {
       // this.clientNameList.push(client.clientName);
        //this.clientIDList.push(client.clientId);
        this.clientNameList.push({ "clientName": client.clientName, "clientId": client.clientId});
      });
      console.log("re"+JSON.stringify(this.clientNameList));
     // console.log("zz"+this.clientIDList);
      

    })
    err => {
      console.log(err);
    }

    this.itemService.getItem().subscribe(itemdata => {
      this.itemList = itemdata
      console.log("updateditemList",this.itemList);
      // console.log("itemList"+JSON.stringify(this.itemList));
      this.itemList.forEach(item => {
        // console.log("item"+JSON.stringify(item));

        //this.itemNameList.push(item.itemName);
        this.itemNameList.push({ "itemName":item.itemName, "itemId": item.itemId});
      });
      console.log("ddd"+JSON.stringify(this.itemNameList));
    })
    err => {
      console.log(err);
    }

    this.orderService.getOrderList().subscribe(orderData=>{
      console.log("pop"+JSON.stringify(orderData));
      
    });

  }
  
 
  
  
  
  public orders: OrderModel[] = [];
  orderlist: Orderlist = new Orderlist();
  onSubmit() {
    debugger;
    var date=new Date().toJSON();
    var order: OrderModel = new OrderModel();
   
    order = {
      ClientName:this.clientName,
      ItemName:this.itemName,
      OrderId:this.registerForm.value.OrderId,
      ClientId :this.clientID,
      OrderDate : date.substring(0,date.length-5),
      ItemId : this.itemID,
      Quantity : this.registerForm.value.Quantity,
    };
    this.orders.push(order);
  console.log("orderpost"+JSON.stringify(this.orders));
  
    
    
  }

  saveDb()
  {
    debugger;
   // console.log(this.orderList)
    this.submitted = true;
    
    this.orderList.order = this.orders;
    this.orderService.postOrderList(this.orderList).subscribe(item => {
      console.log("save"+item);
      
      this.routes.navigate(['OrderList']);
   // this.orderService.postOrderList(this.orderList)
     // .subscribe(data => {
     // console.log(data);
     // this.routes.navigate(['OrderList']);  
 

  alert('Saved Successfully')
});

  }



}




