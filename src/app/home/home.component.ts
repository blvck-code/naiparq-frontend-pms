import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  fromEvent,
  Observable,
  BehaviorSubject,
  Subject,
  takeUntil,
} from 'rxjs';
import { blogger, isLoggedIn, userName } from '../auth/state/auth.selector';
import * as authActions from '../auth/state/auth.actions';
import { blogLoaded } from './state/home.reducer';
import * as homeActions from './state/home.actions';
// @ts-ignore
import { WINDOW } from './services/home.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'naiparq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  showMenu: boolean = false;
  currentYear: any;

  @ViewChild('home', { static: true }) 'home': ElementRef;

  blogger$: Observable<boolean> = this.store.select(blogger);
  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);
  userName$: Observable<string> = this.store.select(userName);

  blogLoaded$: Observable<boolean> = this.store.select(blogLoaded);

  destroy = new Subject();
  destroy$ = this.destroy.asObservable();

  constructor(private store: Store<AppState>, private renderer2: Renderer2) {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => console.log(this.getYPosition(e)));
  }

  getYPosition(e: any): number {
    return (e.target as Element).scrollTop;
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.destroy.next();
  }
  getDate(): void {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    // this.initAnimation();
    this.getDate();
    this.getArticles();
    this.toggleSideNav();
  }
  @HostListener('window:scroll', ['$event'])
  handleNavShadow(event: any): void {
    console.log('Height ==>>', event);
    window.onscroll = () => {
      console.log('scrolling');
      if (window.scrollY > 22) {
        console.log('Show shadow');
      } else {
        console.log('Hide shadow');
      }
    };
  }

  getArticles(): void {
    this.blogLoaded$.subscribe({
      next: (status) => {
        if (status) return;
        this.store.dispatch(new homeActions.FetchBlog());
      },
    });
  }

  toggleSideNav(): void {
    this.home?.nativeElement.addEventListener('click', (event: any) => {
      console.log(122222);
    });
  }

  closeMenu(event?: any): void {
    if (event.target.classList.contains('backdrop')) {
      this.showMenu = false;
      return;
    }
    this.showMenu = false;
    return;
  }

  logOut(): void {
    this.store.dispatch(new authActions.LogOut());
  }
}
