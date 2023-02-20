import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';
import { isLoggedIn, userName } from '../auth/state/auth.selector';
import * as authActions from '../auth/state/auth.actions';
import { blogList, blogLoaded, blogLoading } from './state/home.reducer';
import * as homeActions from './state/home.actions';
import { BlogModel } from './model/blog.model';

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

  showMenu: boolean = false;
  currentYear: any;
  isNavbarVisible: boolean = true;
  prevScrollPos = window.pageYOffset;

  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);
  userName$: Observable<string> = this.store.select(userName);

  blogLoaded$: Observable<boolean> = this.store.select(blogLoaded);

  constructor(private store: Store<AppState>) {}

  getDate(): void {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    // this.initAnimation();
    this.getDate();
    this.onWindowScroll();
    this.getArticles();
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
    this.showMenu = !this.showMenu;
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

  @HostListener('window:scroll', [])
  onWindowScroll(): any {
    const currentScrollPos = window.pageYOffset;

    if (this.prevScrollPos > currentScrollPos) {
      this.isNavbarVisible = true;
    } else {
      this.isNavbarVisible = false;
    }
    console.log('Visible ===>>', this.isNavbarVisible);
    this.prevScrollPos = currentScrollPos;
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
