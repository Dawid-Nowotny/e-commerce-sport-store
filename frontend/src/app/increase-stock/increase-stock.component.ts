import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';


@Component({
  selector: 'app-increase-stock',
  templateUrl: './increase-stock.component.html',
  styleUrls: ['./increase-stock.component.css']
})
export class IncreaseStockComponent {
  category: string = '';
  productId: string = '';
  buty: string = '42';
  pilka: string = '1';
  ubranie: string = 'M';
  ilosc: number = 1;
  
  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.productId = urlSegments[urlSegments.length - 1].toString();
    
      this.serverService.getProductCategory(this.productId).subscribe(response => {
        this.category = response.category;
      });
    });
  }

  addToStock() {
    let data = {};
    if(this.category == "Buty") {
      data = {
        productId: this.productId,
        size: this.buty,
        amount: this.ilosc
      }
    }
    else if(this.category == "Piłka") {
      data = {
        productId: this.productId,
        size: this.pilka,
        amount: this.ilosc
      }
    }
    else if(this.category == "Ubranie") {
      data = {
        productId: this.productId,
        size: this.ubranie,
        amount: this.ilosc
      }
    }
    
    this.serverService.addProductStock(data).subscribe(response => {
      
    });
  }
}
