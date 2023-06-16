import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Type } from '@angular/core'; 

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  currentComponent: string | null = null;
  @Input() itemId: string = ''; 
  @Input() itemName: string = ''; 
  @Input() itemCategory: string = ''; 
  @Input() itemBrand: string = ''; 
  @Input() notFound: string = ''; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentComponent = this.getCurrentComponentName();
      });
  }

  private getCurrentComponentName(): string | null {
    const currentUrl = this.router.url;
    return currentUrl;
  }

  isCurrentComponent(componentName: string): boolean {
    return this.router.url.startsWith(componentName);
  }

  navigateToCategory(category: string): void {
    this.router.navigate([''], { queryParams: { category: category, brand: 'Wszystkie' } });
  }
  
  navigateToBrand(brand: string): void {
    this.router.navigate([''], { queryParams: { brand: brand, category: 'Wszystkie' } });
  }

  navigateToHomePage(): void {
    this.router.navigate([''], { queryParams: { brand: 'Wszystkie', category: 'Wszystkie' } });
  }
}