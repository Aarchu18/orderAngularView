import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client.service';
import { ClientModel } from 'src/app/client-model';
import { Http } from '@angular/http';
import { Title } from '../../../node_modules/@angular/platform-browser';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  public itemList: any = [];
  itemIDList: any = [];
  constructor(private formBuilder: FormBuilder,private title:Title,private routes:Router,private clientService:ClientService,
  ) {
    this.title.setTitle("Order Management Client Registration");
   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      
      
      ClientName: ['', [Validators.required,Validators.pattern("^[a-zA-Z]*$"),Validators.maxLength(20)]],
      ClientContact: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(10)]],
      ClientAddress: ['', [Validators.required, Validators.maxLength(100)]],
      
  });
  // this.itemService.getItem().subscribe(itemdata=>{
  //   this.itemList=itemdata
  //   this.itemList.forEach(item => {
  //     // console.log("item"+JSON.stringify(item));

  //     this.itemIDList.push(item.itemId);
  //   });
  //   console.log("100rabh",this.itemIDList);
  // }) 
  
  }
  
  get f() { return this.registerForm.controls; }
 

  contactKeyPress(event) {
    if (!Number(event.key) && (event.key != 0)) {
      return false;
    }
    const currentVal = this.registerForm.controls.ClientContact.value + event.key; //projected value that u type
    if (currentVal.length == 11) {
      return false;
    }
  }

  onSubmit() {
    
    
    this.submitted = true;
    
    debugger
      this.clientService.postClient(this.registerForm.value)
        .subscribe(data => {
        console.log(data);
          this.routes.navigate(['AddOrder']);  
         // this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        

    // // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('Client-Registration Successful')
});


}
}
