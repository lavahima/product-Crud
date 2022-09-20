import { Component, OnInit } from '@angular/core';
import { first, map, startWith } from 'rxjs/operators';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product-model';
import { FormControl } from '@angular/forms';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    products!: Product[];
    myControl = new FormControl();
    filteredOptions: any;
    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getAll()
            .pipe(first())
            .subscribe(product => this.products = product);
        console.log(this.products);
    }
    applyFilter(filterValue: any) {
        console.log(filterValue);
        this.filteredOptions = this.products.filter(option => option.productName.toLowerCase().includes(filterValue));
        this.products = this.filteredOptions;
    }
}