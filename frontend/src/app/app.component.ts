import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AWAZONsport';
  isLogged: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkState();
  }

  logout(): void {
    localStorage.removeItem('user_id');
    this.isLogged = false;
    this.cdr.detectChanges();
  }

  checkState() {
    if(localStorage.getItem('user_id') != undefined) {
      this.isLogged = true;
    }
    this.cdr.detectChanges();
  }
}
