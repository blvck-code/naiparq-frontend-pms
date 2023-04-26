import { Component, Input, OnInit } from '@angular/core';

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

  nextSlide(): void {
    if (this.selectIndex === this.carousel.length - 1) {
      this.selectIndex = 0;
      return;
    }
    this.selectIndex += 1;
    console.log('Slides ==>>', this.carousel.length);
  }

  ngOnInit() {}
}
