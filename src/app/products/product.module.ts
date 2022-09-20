import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list.component';
import { LayoutComponent } from './layout.component';
import { AddComponent } from './add.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddComponent
    ],
    exports:[
        LayoutComponent,
        ListComponent,
        AddComponent
    ]
})
export class ProductModule { }