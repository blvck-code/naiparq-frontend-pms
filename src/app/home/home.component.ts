import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { isLoggedIn, userName } from '../auth/state/auth.selector';
import * as authActions from '../auth/state/auth.actions';
import { blogList, blogLoaded, blogLoading } from './state/home.reducer';
import * as homeActions from './state/home.actions';
import { BlogModel } from './model/blog.model';
import { HomeService } from './services/home.service';
// @ts-ignore
import { WINDOW } from './services/home.service';
import { DOCUMENT } from '@angular/common';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  showMenu: boolean = false;
  currentYear: any;
  isNavbarVisible = true;
  lastScrollTop = 0;

  @ViewChild('home', { static: true }) 'home': ElementRef;

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
    this.getArticles();
    this.toggleSideNav();
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
    let lastScrollTop = 0;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    console.log(window.onscroll);
    console.log(document.body.onscroll);

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
