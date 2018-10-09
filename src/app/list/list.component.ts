import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from '../list.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { OrderModel } from '../order-model';
import { Title } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;
  public totalList: any = [];
   clientNameList:any[];
  

  constructor(public dialog: MatDialog,
    private orderService: OrderService,private title:Title, private listService: ListService, private routes: Router,
    private builder: FormBuilder) {
    this.registerForm = builder.group({
      ClientName: ['', Validators.required],
      ItemName: ['', Validators.required],
      Quantity: ['', Validators.required],
      OrderDate: ['', Validators.required]
    })
    this.title.setTitle("Order Management Order List");
  }

  get f() { return this.registerForm.controls; }

  openDialog(id: number, index) {
    this.listService.setId(id);
    var order: OrderModel = new OrderModel();
    order.OrderId = id;
    order.ClientId = this.totalList[index].clientId;
    order.ItemId = this.totalList[index].itemId;
    order.ClientName = this.totalList[index].clientName;
    order.ItemName = this.totalList[index].itemName;
    order.Quantity = this.totalList[index].quantity;
    order.OrderDate = this.totalList[index].orderDate;
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
      data: order
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      console.log(result)
    });
  }

  ngOnInit() {
    this.orderService.getOrderList().subscribe(listdata => {
      this.totalList = listdata
      //  console.log("clientList"+JSON.stringify(this.totalList));
     // console.log("aa"+JSON.stringify(this.totalList[0].clientName));
      this.totalList.forEach(element => {
        console.log("for"+JSON.stringify(element));
        console.log("foraaa"+JSON.stringify(element.clientName));
        this.clientNameList=element.clientName;
        console.log("name"+ this.clientNameList);
      });
    
    
      
    });
  }

  deleteOrderDetails(index) {
    console.log("mydeleteIndex", index)
    this.totalList.splice(index, 1);
  }

  delete(id: number, index) {
    console.log("id=" + id + "index=" + index);
    if (confirm('Are you sure to delete this record ?') == true) {
      this.listService.deleteOrderList(id).subscribe(x => {
        this.orderService.getOrderList();
        alert("Deleted Successfully");
        console.log("output" + JSON.stringify(x));
      })
    }
    this.totalList.splice(index, 1);
    console.log("index" + index);
  }
}







