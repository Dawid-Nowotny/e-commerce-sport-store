import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from './server.service';
import { Item } from './item/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AWAZONsport';
  isLoading: boolean = false;
  searchResult: boolean = false;
  items: Item[] = [];
  searchValue: string = "";

  constructor(private serverService: ServerService,private router: Router) {}


  onPanelMouseLeave(event: MouseEvent) {
    const panelDiv = document.querySelector('#search');
    const isMouseOver = panelDiv?.contains(event.relatedTarget as Node);
    
    this.searchResult = isMouseOver !== undefined ? isMouseOver : false;
    if (!this.searchResult) {
      this.searchValue = ""; 
    }
  }

  onInputChange(): void {
    if (this.searchResult) {
      this.isLoading = true;
      this.serverService.getSearchResult(this.searchValue).subscribe(response => {
        console.log(response.items);
        this.items = response.items;
        this.isLoading = false;
      });
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.searchResult) {
        this.isLoading = true;
        this.serverService.getSearchResult(this.searchValue).subscribe(response => {
          this.items = response.items;
          this.isLoading = false;
        });
      }
    }
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]);
  }
}
