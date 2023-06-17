import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { Sizes } from '../sizes/sizes';

@Component({
  selector: 'app-increase-stock',
  templateUrl: './increase-stock.component.html',
  styleUrls: ['./increase-stock.component.css']
})
export class IncreaseStockComponent {
  isAdmin: boolean = false;
  category: string = '';
  productId: string = '';
  rozmiar: string = '';
  ilosc: number = 1;
  sizes: string[] = []
  
  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.isAdmin().subscribe(
      (response: any) => {
        if(response.isAdmin == true) {
          this.isAdmin = true;
          this.route.url.subscribe(urlSegments => {
            this.productId = urlSegments[urlSegments.length - 1].toString();
          
            this.serverService.getProductCategory(this.productId).subscribe(response => {
              this.category = response.category;
              if(this.category == "Buty")
                this.sizes = Sizes.boots;
              else if(this.category == "Ubranie")
                this.sizes = Sizes.clothes;
              else if(this.category == "Piłka")
                this.sizes = Sizes.balls;
            });
          });
        }
      }
    );
  }

  addToStock() {
    const data = {
      productId: this.productId,
      size: this.rozmiar,
      amount: this.ilosc
    }
    
    this.serverService.addProductStock(data).subscribe(response => {
      
    });
  }
}
