import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface carouselContent {
  imgSrc: string;
  imgAlt: string;
  title: string;
}

@Component({
  selector: 'naiparq-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() carousel: carouselContent[] = [];
  selectIndex = 0;
  indexObservable = new BehaviorSubject(this.selectIndex);
  indexAsSubject$ = this.indexObservable.asObservable();

  nextSlide(): void {
    if (this.selectIndex === this.carousel.length - 1) {
      this.indexObservable.next((this.selectIndex = 0));
      return;
    }
    this.indexObservable.next((this.selectIndex += 1));
  }

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
      console.log('Next slide', this.selectIndex);
    }, 5000);
  }
}
