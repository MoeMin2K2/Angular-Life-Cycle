import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import lottie from 'lottie-web';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule],
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements AfterViewInit {
  @ViewChild('lottieContainer') lottieContainer!: ElementRef;

  ngAfterViewInit() {
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      path: 'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json', 
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
  }
}
