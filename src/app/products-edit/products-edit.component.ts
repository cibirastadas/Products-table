import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms"
import * as uuid from 'uuid';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.module';
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  myId = uuid.v4();
  productsForm : FormGroup;
  heading: string;
  mode: Boolean;
  id: Number;
  product;
  constructor(private router: Router, private activeRoute: ActivatedRoute,private fb: FormBuilder, private productService: ProductsService) { 
  }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      id : 0,
      name : "",
      creationDate: "",
      categories : this.fb.array([""]),
      price : [0],
      currency : "EUR"
    })
    this.mode= this.router.url === "/add";
    this.heading = this.mode ? "Add Products" : "Edit Products"
    this.id= +this.activeRoute.snapshot.paramMap.get('id');

    if(!this.mode){

      this.product = this.productService.getOneProduct(this.id)
    }
    this.productsForm.valueChanges.subscribe(console.log)
  }

  onSubmit(): void{

    if(this.mode){
 /*      const newId = {
        id : this.myId,
        creationDate : new Date,
      }
      const newProduct = {...this.productsForm.value,...newId};  */
      let newProduct: Product = this.productsForm.value
      newProduct.creationDate = new Date().toString();
      newProduct.id = this.myId;
      this.productService.onAdd(newProduct)
    }else{
      let newProduct: Product = this.productsForm.value
      newProduct.id = this.product.id
      newProduct.creationDate = this.product.creationDate
      this.productService.onUpdate(newProduct)
    }
    this.router.navigateByUrl("")
  }
  
  get categories() {
    return this.productsForm.get('categories') as FormArray;
  }

  get name() {
    return this.productsForm.get('name');
  }

}
