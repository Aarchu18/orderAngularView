import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListService } from 'src/app/list.service';
import { NgForm, FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { OrderModel } from 'src/app/order-model';
import { Orderlist } from 'src/app/orderlist';
import { OrderService } from '../order.service';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

  orderlist:Orderlist = new Orderlist();
  public totalList: any = [];
  id:number;
  order:OrderModel=new OrderModel();
  public orderId: number;
  public clientName: string;
  public itemName: string;
  public quantity: number;
  public orderDate:any;
  public clientId:number;
  public itemId:number;

  constructor(public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderModel,private listService:ListService,
    private orderService:OrderService) {

      this.order=data;
      this.orderId=this.order.OrderId;
      this.clientId=this.order.ClientId;
      this.itemId=this.order.ItemId;
      this.clientName=this.order.ClientName;
      this.itemName=this.order.ItemName;
      this.quantity=this.order.Quantity;
      this.orderDate=this.order.OrderDate;
     }

    

  ngOnInit() {
    this.id = this.listService.getId();
  }
  profileForm = new FormGroup({
    OrderId: new FormControl(''),
    ClientName: new FormControl(''),
    ItemName: new FormControl(''),
    Quantity: new FormControl(''),
    OrderDate: new FormControl(''),

  });
  
  save()
  {
    debugger
    var updatedOrderList: OrderModel = new OrderModel();

    updatedOrderList = {
      ClientId:this.clientId,
      ItemId: this.itemId,
      OrderId:this.orderId,
      ClientName:this.clientName,
      ItemName:this.itemName,
      Quantity:this.quantity,
      OrderDate:this.orderDate
    };
    if (confirm("Would you like to Save Changes?") == true){
      this.listService.putOrderList(this.id,updatedOrderList).subscribe(res=>{
        alert("Updated Successfully");
      
      });
    }
   
    this.orderService.getOrderList().subscribe(order=>{
      this.totalList=order;
      window.location.reload();
     
      this.dialogRef.close("Saved Successfully");
     
    });
    
    //alert("Updated Successfully");
    
  }
  

}
