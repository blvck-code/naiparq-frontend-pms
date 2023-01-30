import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('intro', { static: true })
  'intro': ElementRef<HTMLDivElement>;
  @ViewChild('introTitle', { static: true })
  'introTitle': ElementRef<HTMLDivElement>;
  @ViewChild('introText', { static: true })
  'introText': ElementRef<HTMLDivElement>;
  @ViewChild('introBtns', { static: true })
  'introBtns': ElementRef<HTMLDivElement>;
  @ViewChild('introImg', { static: true })
  'introImg': ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {
    // this.initAnimation();
    this.initScrollAnimation();
  }

  initAnimation(): void {
    // Intro Title
    gsap.from(this.introTitle.nativeElement, {
      duration: 0.7,
      opacity: 0,
      y: 30,
      skewY: 1.5,
      delay: 0.5,
    });

    // Intro Text
    gsap.from(this.introText.nativeElement, {
      duration: 0.7,
      opacity: 0,
      x: -50,
      delay: 0.8,
    });

    // Intro Img
    gsap.from(this.introImg.nativeElement, {
      duration: 1,
      opacity: 0,
      x: 50,
      delay: 1,
    });

    // Intro Buttons
    gsap.from(this.introBtns.nativeElement.childNodes, {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 1.8,
      stagger: {
        amount: 0.2,
      },
    });
  }

  initScrollAnimation(): void {
    // Intro
    // gsap.to(this.intro.nativeElement, {
    //   scrollTrigger: {
    //     trigger: '.naiparq-home__landing-content',
    //     start: 'top top',
    //     scrub: true,
    //   },
    // });
    // Intro Title
    gsap.to(this.introTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.intro.nativeElement,
        start: '-100 0',
        scrub: true,
      },
      yPercent: -100,
    });
  }
}
