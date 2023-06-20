import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { Item } from '../item/item';
import { Sizes } from '../sizes/sizes';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements AfterViewInit, OnInit {
  isLoading: boolean = false;
  productId: string = '';
  item: Item[] = [];
  sizes: string[] = [];
  size: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  slideIndex: number = 1;
  a: number = 0;
  @ViewChildren('slide') slides!: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute, private serverService: ServerService, private cdr: ChangeDetectorRef) {}
 
  ngOnInit() {
    this.isLoading = true;
    this.route.url.subscribe(urlSegments => {
      this.productId = urlSegments[urlSegments.length - 1].toString();
  
      this.serverService.getDetails(this.productId).subscribe(response => {
        this.item = [response.items];
        if (this.item[0].category == "Buty")
          this.sizes = Sizes.boots;
        else if (this.item[0].category == "Ubranie")
          this.sizes = Sizes.clothes;
        else if (this.item[0].category == "Piłka")
          this.sizes = Sizes.balls;
  
        if (this.isAvailable(this.size)) {
          this.size = this.size; 
        } else {
          this.size = ''; 
        }
        setTimeout(() => {
          this.showSlides(1);
        }, 0);
        
        this.isLoading = false;
      });
    });
  }

  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }
  
  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    let i;
    let slides = this.slides ? this.slides.toArray() : [];
    let thumbnails = document.getElementsByClassName('thumbnail') as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) { this.slideIndex = 1; }    
    if (n < 1) { this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      if (slides[i].nativeElement) {
        slides[i].nativeElement.style.display = "none";
      }  
    }
    for (i = 0; i < thumbnails.length; i++) {
      thumbnails[i].className = thumbnails[i].className.replace(" active", "");
    }
    if (slides[this.slideIndex - 1]?.nativeElement) {
      slides[this.slideIndex - 1].nativeElement.style.display = "block";
    }  
    thumbnails[this.slideIndex - 1]?.classList.add("active");
  }
  
  isAvailable(size: string): boolean {
    if (this.item[0].sizes_and_amounts[this.parseSize(size)]) {
      return true;
    } else {
      return false;
    }
  }

  parseSize(size: string): number {
    const sizeMap: { [key: string]: number } = {
      XS: 1,
      S: 2,
      M: 3,
      L: 4,
      XL: 5,
      XXL: 6,
    };

    const numericValue = parseInt(size, 10);
    if (!isNaN(numericValue)) {
      return numericValue;
    }
  
    return sizeMap[size as keyof typeof sizeMap] || 0;
  }
  
  onSubmit() {
    const data = {
      userId: localStorage.getItem("user_id"),
      productId: this.productId,
      size: this.size.toString()
    }

    if(Boolean(localStorage.getItem('isLogged'))) {
      if(data.size) {
        this.serverService.addToCart(data).subscribe(
          (response: any) => {
            if (response.success) {
              this.successMessage = response.message;
              this.errorMessage = "";
            }
            else {
              this.successMessage = "";
              this.errorMessage = response.message;
            }
          }
        );
      } else {
        this.successMessage = "";
        this.errorMessage = "Musisz wybrać rozmiar!";
      }
    } else {
      this.successMessage = "";
      this.errorMessage = "Musisz się zalogować, aby dodać produkt do koszyka!";
    }
  }
}