import { Component, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements AfterViewInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;

  constructor(private serverService: ServerService) {}

  ngAfterViewInit(): void {
    this.isLogged = Boolean(localStorage.getItem('isLogged'));
    this.isAdmin = Boolean(localStorage.getItem('isAdmin'));
  }
}
