import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService} from 'src/app/item.service';
import { ItemModel} from 'src/app/item-model';
import { Http } from '@angular/http';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  categoryList:any=[];
  categoryTotalList:any=[];
  constructor(private formBuilder: FormBuilder,private title:Title,private routes:Router,private itemService:ItemService) { 
    this.title.setTitle("Order Management Item Registration");
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      
      
      ItemName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      ItemCategory: ['', [Validators.required]],
      ItemQuantity: ['', [Validators.required,Validators.maxLength(100)]],
      
  });
  this.itemService.getCategory().subscribe(categoryData=>{
    debugger
  this.categoryList=categoryData;
  console.log("categoryList",this.categoryList);
  this.categoryList.forEach(category => {
  this.categoryTotalList.push(category.categoryName); 
  });
  console.log("filteredList",this.categoryTotalList);
  })
  err => {
    console.log(err);
  }
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    
    
    this.submitted = true;
    
    
      this.itemService.postItem(this.registerForm.value)
        .subscribe(data => {
        console.log(data);
          this.routes.navigate(['ClientRegistration']);  
         // this.toastr.success('New Record Added Succcessfully', 'Employee Register');
         

    // // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('Item-Registration Successful')
});


}

}
