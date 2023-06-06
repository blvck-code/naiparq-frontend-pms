import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 *  Main app component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * Performs navigation animations
   *
   * @param outlet
   */
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }

  constructor() {}

  ngOnInit() {}
}
