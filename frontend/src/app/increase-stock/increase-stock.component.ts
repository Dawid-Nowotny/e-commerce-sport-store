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
  sizes: string[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  
  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit() {
    if(Boolean(localStorage.getItem('isAdmin'))) {
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
          this.rozmiar = this.sizes[0];
        });
      });
    }
  }

  ngAfterViewInit(): void {
    this.isAdmin = Boolean(localStorage.getItem('isAdmin'));
  }

  addToStock() {
    const data = {
      productId: this.productId,
      size: this.rozmiar,
      amount: this.ilosc
    }

    if(this.rozmiar == '') {
      this.errorMessage = 'Wybierz rozmiar!';
    } else {
      this.errorMessage = '';
      this.serverService.addProductStock(data).subscribe(response => {
        if(response.success == true) {
          this.successMessage = 'Dodano produkt do magazynu!';
          this.errorMessage = '';
        } else {
          this.successMessage = '';
          this.errorMessage = 'Wystąpił błąd!';
        }
      });
    }
    
    
  }
}
