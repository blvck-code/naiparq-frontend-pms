import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'naiparq-frontend-pms';
  public onlineStatus: boolean = true;
  public 'online$': Subscription;
  private 'offline$': Observable<string>;

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }

  constructor(private sharedSrv: SharedService) {}

  ngOnInit() {}

  internetStatus(): void {
    // Checks if internet connected after every 5 seconds
    setInterval(() => {
      if (!navigator.onLine) {
        this.sharedSrv.showNotification('No internet connection!', 'info');
      }
    }, 5000);
  }
}
