import { Component, ChangeDetectorRef } from '@angular/core';
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
  isLogged: boolean = false;
  admin: boolean = false;
  isLoading: boolean = false;
  searchResult: boolean = false;
  items: Item[] = [];
  searchValue: string = "";
  userName: string | null = '';

  constructor(private serverService: ServerService,private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkState();
  }

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
  
  logout(): void {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    this.isLogged = false;
    this.admin = false;
    this.serverService.admin = false;
    this.serverService.isLogged = false;
    this.cdr.detectChanges();
  }

  checkState() {
    if(localStorage.getItem('user_id') != undefined) {
      this.userName = localStorage.getItem('user_name');
      this.serverService.isLogged = true;
      this.isLogged = true;
      this.serverService.isAdmin().subscribe(
        (response: any) => {
          if(response.isAdmin == true) {
            this.admin = true;
            this.serverService.admin = true;
          }
        }
      );
    }
    this.cdr.detectChanges();
  }
}
