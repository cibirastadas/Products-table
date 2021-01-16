import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { formatDate} from '@angular/common';
import { Product } from '../models/product.module';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  headers: string[];
  products: Product[];
  search: string;
  data: Array<any>;
  totalRecords: number;
  page: Number = 1;
  headId: boolean = false;
  headName: boolean = false;
  headPrice: boolean = false;
  headCategories: boolean = false;
  headDate: boolean = false;
  
  
  constructor(@Inject(LOCALE_ID) private locale: string, private service: ProductsService) { 
    this.headers = service.getHeaders();
    this.sorByDefault()
    this.totalRecords = this.products.length
  }
  ngOnInit(): void {
    
  }
  onDelete(id: number): void{
    this.service.onDelete(id)
    this.onReload();
  }

  dataFormat (date: string){
    return formatDate(date,'yyyy-MM-dd HH:mm:ss', this.locale);
  }

  onReload(): void{
   this.products = this.service.getProducts()
   this.totalRecords = this.products.length
  }
  
  sorByDefault(): void{
    this.products = this.service.getProducts().sort((a, b) => a.name.localeCompare(b.name))
  }

  onLoopArray(array: Array<any>){
    let separate = array.join(", ")
    return separate
  }

  sort(key: string): void{
    switch (key) {
      case 'ID':
        this.headId ? 
        this.products.sort((a, b) => a.id - b.id) : 
        this.products.sort((a, b) => b.id - a.id)
        this.headId = !this.headId
          break;
      case'Pruduct name':
        this.headName ? 
        this.products.sort((a, b) => a.name.localeCompare(b.name)) :
        this.products.sort((a, b) => b.name.localeCompare(a.name))
        this.headName = !this.headName
          break;
      case 'Price':
        this.headPrice ? 
        this.products.sort((a, b) => a.price - b.price) : 
        this.products.sort((a, b) => b.price - a.price)
        this.headPrice = !this.headPrice
          break;
      case 'Categories':
        this.headCategories ?
        this.products.sort((a, b) => a.categories[0].localeCompare(b.categories[0])) : 
        this.products.sort((a, b) => b.categories[0].localeCompare(a.categories[0])) 
        this.headCategories = !this.headCategories
          break;
      case 'Creation date':
        this.headDate ? 
        this.products.sort((a, b) => {
          a.creationDate.split('-').reverse().join('')
          b.creationDate.split('-').reverse().join('')
          return a.creationDate.localeCompare(b.creationDate)
        }) :
        this.products.sort((a, b) => {
          a.creationDate.split('-').reverse().join('')
          b.creationDate.split('-').reverse().join('')
          return b.creationDate.localeCompare(a.creationDate)
        })
        this.headDate = !this.headDate
          break;
      case '':
        this.sorByDefault()
          break;
      default:
          break;
  }
}

  dateToNum(d: any) {
    d = d.split(" "); return Number(d[2]+d[1]+d[0]);
  }
}
