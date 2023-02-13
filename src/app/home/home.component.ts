import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('navBar', { static: true }) 'navBar': ElementRef<HTMLDivElement>;

  currentYear: any;
  isNavbarVisible: boolean = true;
  prevScrollPos = window.pageYOffset;
  constructor() {}

  getDate(): void {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    // this.initAnimation();
    this.getDate();
    this.onWindowScroll()
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): any {
    const currentScrollPos = window.pageYOffset;

    if (this.prevScrollPos > currentScrollPos) {
      this.isNavbarVisible = true
    } else {
      this.isNavbarVisible = false
    }
    console.log('Visible ===>>', this.isNavbarVisible)
    this.prevScrollPos = currentScrollPos
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
