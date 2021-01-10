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
  headers;
  products: Product[];
  search: string;
  data: Array<any>;
  totalRecords: number;
  page:Number=1;
  constructor(@Inject(LOCALE_ID) private locale: string, private service: ProductsService) { 
    this.headers = service.getHeaders();
    this.products = service.getData();
    this.totalRecords = this.products.length
    console.log(this.products)
  }
  ngOnInit(): void {
    
  }

  onDelete(id): void{
    this.service.onDelete(id)
  }
  dataFormat (date){
    return formatDate(date,'yyyy-MM-dd HH:mm:ss', this.locale);
  }
  onLoopArray(array){
    let separate = array.join(", ")
/*     let newArray: string="";
    array.forEach(arr => {
      newArray +=" "+ arr
    }); */
    return separate
  }
  key: string = "id";
  reverse: boolean = false;
  sort(id){
    console.log(id)
    this.reverse = !this.reverse
  }
}
