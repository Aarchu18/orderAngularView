import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit() {
  }
  addClient()
  {
    this.routes.navigate(['ClientRegistration']);
  }
  placeOrder()
  {
    this.routes.navigate(['AddOrder']);
  }
  showOrder()
  {
    this.routes.navigate(['OrderList']);
  }

}
