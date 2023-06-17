import { Component } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  isAdmin: boolean = false;

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.serverService.isAdmin().subscribe(
      (response: any) => {
        if(response.isAdmin == true) {
          this.isAdmin = true;
        }
      }
    );
  }
}
