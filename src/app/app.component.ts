import { Component, OnInit } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { trigger } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'naiparq-frontend-pms';
  status?: OnlineStatusType; //Enum provided by ngx-online-status
  onlineStatusCheck: any = OnlineStatusType;

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }

  constructor(private onlineStatusService: OnlineStatusService) {}

  ngOnInit() {
    console.log(123);
    this.onlineStatusService.status.subscribe({
      next: (status: OnlineStatusType) => {
        // Retrieve Online status Type
        this.status = status;
        console.log('Online status ', status);
      },
    });
  }
}
