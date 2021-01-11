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
  products;
  constructor(private router: Router, private activeRoute: ActivatedRoute,private fb: FormBuilder, private productService: ProductsService) { 
  }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      id : 0,
      name : [""],
      creationDate: [""],
      categories : this.fb.array([this.fb.control("")]),
      price : [0],
      currency : "EUR"
    })
    this.mode= this.router.url === "/add";
    this.heading = this.mode ? "Add Products" : "Edit Products"
    this.id=+ this.activeRoute.snapshot.paramMap.get('id');
    if(!this.mode){
        this.products = this.productService.getOneProduct(this.id)
        this.patchValues();
    }
   /*  this.productsForm.valueChanges.subscribe(console.log) */
  }

  onSubmit(): void{

    if(this.mode){
      let newProduct: Product = this.productsForm.value
      newProduct.creationDate = new Date().toString();
      newProduct.id = this.getRndInteger();
      this.productService.onAdd(newProduct)
    }else{
      let newProduct: Product = this.productsForm.value
      newProduct.id = this.products.id
      newProduct.creationDate = this.products.creationDate
      this.productService.onUpdate(newProduct)
    }
    this.router.navigateByUrl("")
  }
  
  addCategories(){
    this.categories.push(this.fb.control(""))
  }

  removeCategories(index){
    this.categories.removeAt(index)
  }
  
  get categories() {
    return this.productsForm.get('categories') as FormArray;
  }
  
  get name() {
    return this.productsForm.get('name');
  }

  get price(){
    return this.productsForm.get('price');
  }

  patchValues() {
    this.products.categories.forEach((a) => { 
       this.categories.push(this.patch(a.categories)) 
    });
    this.categories.removeAt(this.categories.length -1)
  }

  patch(categorie) {
    return this.fb.control(categorie);
  }

  getRndInteger() {
  return Math.floor(Math.random() * (99999999 - 10000000  + 1) ) + 10000000;
  }

}
