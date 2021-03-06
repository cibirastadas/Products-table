import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms"
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.module';
import { ChangeDetectorRef } from '@angular/core'
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  productsForm : FormGroup;
  heading: string;
  isChangeAction: Boolean;
  id: Number;
  newProduct : Product;
  products: Product;
  oldForm : Product;
  constructor(private router: Router, private activeRoute: ActivatedRoute,private fb: FormBuilder, private productService: ProductsService, private readonly changeDetectorRef: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      id : 0,
      name : ["",[
        Validators.required
      ]],
      creationDate: [""],
      categories : this.fb.array([this.fb.control("")]),
      price : [0, [
        Validators.required,
        Validators.min(1)
      ]],
      currency : "EUR"
    })
    this.isChangeAction = this.router.url === "/add";
    this.heading = this.isChangeAction ? "Add Products" : "Edit Products"
    this.id =+ this.activeRoute.snapshot.paramMap.get('id');
    if(!this.isChangeAction){
        this.products = this.productService.getOneProduct(this.id)
        this.patchValues();
    }
  }

  onSubmit(): void{
    this.newProduct = this.productsForm.value
    var eq = JSON.stringify(this.oldForm as Product) === JSON.stringify(this.productsForm.value as Product) 
    eq ? undefined : this.newProduct.creationDate = new Date().toString();

    if(this.isChangeAction){
      this.newProduct.id = this.getRndInteger();
      this.productService.onAdd(this.newProduct)
    }else{
      this.productService.onUpdate(this.newProduct)
    }
    this.router.navigateByUrl("")
  }
  
  addCategories(): void{
  this.ngAfterViewChecked()
    this.categories.push(this.fb.control(""))
  }

  removeCategories(index: number) : void{
    this.categories.removeAt(index)
  }
  
  patchValues(): void{
    this.products.categories.forEach(element => {
      this.categories.push(this.fb.control(""))
    });
    this.productsForm.patchValue({
      id : this.products.id,
      name : this.products.name,
      categories : this.products.categories,
      price : this.products.price,
      currency : this.products.currency,
      creationDate : this.products.creationDate
    })
    this.categories.removeAt(this.categories.length -1)
    this.oldForm = this.productsForm.value
  }

  getRndInteger() {
  return Math.floor(Math.random() * (99999999 - 10000000  + 1) ) + 10000000;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
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
}
