import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  
  items: any[] = [
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 1',
      price: 653
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 2',
      price: 561
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    },
    {
      image: 'https://gfx.r-gol.com/media/res/products/93/160093/1200x1562/fj2034-060_6.jpg',
      name: 'Product 3',
      price: 670
    }
  ];



  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('AWAZONsport');
  }


}