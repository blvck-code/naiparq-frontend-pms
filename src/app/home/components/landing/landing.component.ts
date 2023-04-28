import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { BlogModel } from '../../model/blog.model';
import { blogList, blogLoading } from '../../state/home.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { SharedService } from '../../../shared/services/shared.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'naiparq-landing',
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

  numOfSlots: number = 1;

  blogList$: Observable<BlogModel[]> = this.store.select(blogList);
  blogLoading$: Observable<boolean> = this.store.select(blogLoading);
  articles: BlogModel[] = [];

  registerForm = this.fb.group({
    email: ['', Validators.required],
    phone: ['', Validators.required],
    location: ['', Validators.required],
    slots: [''],
  });
  constructor(
    private fb: UntypedFormBuilder,
    private sharedSrv: SharedService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.initAnimation();
    // this.initScrollAnimation();
  }

  images = [
    {
      imgSrc: 'assets/images/naiparq-slide-1.png',
      imgAlt: 'Naiparq Barrier',
      title: 'Vehicle Access Control System',
    },
    {
      imgSrc: 'assets/images/naiparq-slide-2.png',
      imgAlt: 'Parking Management Software',
      title: 'Parking Management Software',
    },
    {
      imgSrc: 'assets/images/naiparq-slide-3.png',
      imgAlt: 'Parking Management System',
      title: 'Parking Management System',
    },
    {
      imgSrc: 'assets/images/naiparq-slide-4.png',
      imgAlt: 'Enable Parking Reservation',
      title: 'Enable Parking Reservation',
    },
  ];

  showArticles(): void {
    this.blogList$.subscribe({
      next: (resp) => {
        this.articles = resp;
      },
    });
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

  increaseSlots(): void {
    this.numOfSlots += 1;
  }

  decreaseSlots(): void {
    if (this.numOfSlots === 1) return;
    this.numOfSlots -= 1;
  }

  onSubmit(): void {
    this.sharedSrv.showNotification(
      'Your details were received successfully, we will reach out to you',
      'success'
    );
    console.log('Form data ==>>', this.registerForm.value);
  }
}
