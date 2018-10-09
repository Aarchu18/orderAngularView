import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ClientComponent } from './client/client.component';
import { OrderComponent } from './order/order.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { ClientService} from 'src/app/client.service';
import { ItemService} from 'src/app/item.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { ModalService } from 'src/app/modal.service';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule,MatTableModule } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [{
  path: '',
   component: ItemComponent
 },
 {
  path:'ClientRegistration',
  component:ClientComponent,
},
 {
   path:'AddOrder',
 component: OrderComponent,
 },
 {
   path:'OrderList',
   component:ListComponent
 },
 {
  path:'**',
  component:ItemComponent
}
 
 
 
 ];

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ClientComponent,
    OrderComponent,
    MyDialogComponent,
    ListComponent,
    HeaderComponent,
    
    
    
  ],
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    RouterModule.forRoot(routes)
    
  ],
  entryComponents:[MyDialogComponent],
  providers: [ClientService,ItemService,ModalService],
  bootstrap: [AppComponent],
  
})

export class AppModule { }

