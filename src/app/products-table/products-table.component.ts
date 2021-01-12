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
  oldProducts: Product[];
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
  onDelete(id): void{
    this.service.onDelete(id)
    this.onReload();
  }

  dataFormat (date){
    return formatDate(date,'yyyy-MM-dd HH:mm:ss', this.locale);
  }

  onReload(): void{
   this.products = this.service.getData()
   this.totalRecords = this.products.length
  }
  
  sorByDefault(): void{
    this.products = this.service.getData().sort((a, b) => a.name.localeCompare(b.name))
    this.oldProducts = [...this.products]
  }

  onLoopArray(array){
    let separate = array.join(", ")
    return separate
  }

  sort(key): void{
    let fakeArray = [...this.products]
    let values;
    switch (key) {
      case 'ID':
        key="id"
        this.headId ? 
        values = fakeArray.sort((a, b) => a.id - b.id) : 
        values = fakeArray.sort((a, b) => b.id - a.id)
        this.headId = !this.headId
          break;
      case'Pruduct name':
        key="name"
        this.headName ? 
        values = fakeArray.sort((a, b) => a.name.localeCompare(b.name)) :
        values = fakeArray.sort((a, b) => b.name.localeCompare(a.name))
        this.headName = !this.headName
          break;
      case 'Price':
        key="price"
        this.headPrice ? 
        values = fakeArray.sort((a, b) => a.price - b.price) : 
        values = fakeArray.sort((a, b) => b.price - a.price)
        this.headPrice = !this.headPrice
          break;
      case 'Categories':
        key="categories"
        this.headCategories ?
        values = fakeArray.sort((a, b) => a.categories[0].localeCompare(b.categories[0])) : 
        values = fakeArray.sort((a, b) => b.categories[0].localeCompare(a.categories[0])) 
        this.headCategories = !this.headCategories
          break;
      case 'Creation date':
        key="creationDate"
        this.headDate ? 
        values = fakeArray.sort((a, b) => a.creationDate? -1 : b.creationDate? 1 : 0) :
        values = fakeArray.sort((a, b) => b.creationDate? -1 : a.creationDate? 1 : 0) 
        this.headDate = !this.headDate
          break;
      case '':
        this.products = this.oldProducts
          break;
      default:
          break;
  }
  key ? this.products = this.products.map((item,ind) => {
    return {...item, [key]: values[ind][key]};
  }):undefined;
  }
}
