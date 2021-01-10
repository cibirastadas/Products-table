import { Injectable } from '@angular/core';
import { Product } from '../models/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [{
    "id": 65456465,
    "name": "Sync 2",
    "categories": [ "Windows software", "Application" ],
    "creationDate": "2007-03-14T11:01:00.8031298",
    "price": 59.99,
    "currency": "USD"
  },
  {
    "id": 50451123,
    "name": "Sync 2 Cloud",
    "categories": [ "Windows software", "Application" ],
    "creationDate": "2015-09-23T16:51:10.8031298",
    "price": 49.99,
    "currency": "USD"
  },
  {
    "id": 10288452,
    "name": "SyncGene",
    "categories": [ "Service" ],
    "creationDate": "2015-08-20T12:41:15.8031298",
    "price": 19.69,
    "currency": "EUR"
  },
  {
    "id": 12258452,
    "name": "Mergix",
    "categories": [ "Service" ],
    "creationDate": "2014-09-13T10:21:00.8031298",
    "price": 9.99,
    "currency": "USD"
  },
  {
    "id": 92258411,
    "name": "Duplicate Killer",
    "categories": [ "Windows software", "Application" ],
    "creationDate": "2007-09-01T18:01:10.8031298",
    "price": 39.99,
    "currency": "USD"
  },
  {
    "id": 88158421,
    "name": "vCardWizard",
    "categories": [ "Windows software", "Application" ],
    "creationDate": "2011-10-23T14:51:20.8031298",
    "price": 59.99,
    "currency": "EUR"
  },
  {
    "id": 65058421,
    "name": "OST2",
    "categories": [ "Windows software", "Application" ],
    "creationDate": "2007-10-25T15:00:10.8031298",
    "price": 49.99,
    "currency": "USD"
  },
  {
    "id": 72018421,
    "name": "PST Merger",
    "categories": [ "Windows software", "Application" ],
    "creationDate": "2009-09-20T11:10:10.8031298",
    "price": 36.89,
    "currency": "USD"
  },
  {
    "id": 92198228,
    "name": "SendLater",
    "categories": [ "Windows software", "Application" ],
    "creationDate": "2008-02-02T10:25:13.8031298",
    "price": 16.39,
    "currency": "USD"
  }

]

  constructor() { }
  getHeaders(){
    return ["ID", "Pruduct name", "Categories", "Price", "Creation date",""]
  }

  getData(){
   return this.products
  }
  
  getOneProduct(id: Number){
    return this.products.find(prod=> prod.id === id)
  }

  onAdd(products: Product){
    this.products.push(products)
  }

  onDelete(id: Number){
      let product = this.products.find(prod=> prod.id === id)
      let productIndex=(this.products.indexOf(product))
      this.products.splice(productIndex, 1)
  }

  onUpdate(product: Product){
    let oldProduct = this.products.find(prod=> prod.id === product.id)
    oldProduct.name = product.name
    oldProduct.categories = product.categories
    oldProduct.price = product.price
  }
}
