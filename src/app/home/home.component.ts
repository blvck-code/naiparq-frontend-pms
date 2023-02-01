import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('logo', { static: true })
  'logo': ElementRef<HTMLDivElement>;

  @ViewChild('menuSecond', { static: true })
  'menuSecond': ElementRef<HTMLDivElement>;

  @ViewChild('menu', { static: true })
  'menu': ElementRef<HTMLDivElement>;

  currentYear: any;
  constructor() {}

  getDate(): void {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    // this.initAnimation();
    this.getDate();
  }

  initAnimation(): void {
    // Logo
    gsap.from(this.logo.nativeElement, {
      duration: 0.7,
      opacity: 0,
      y: -30,
      delay: 1.5,
    });

    // Other links
    gsap.from(this.menuSecond.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 1.8,
    });

    // Auth Links
    gsap.from(this.menu.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 2,
    });
  }
}
