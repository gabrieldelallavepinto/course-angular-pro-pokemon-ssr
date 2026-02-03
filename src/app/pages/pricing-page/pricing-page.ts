import { isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.css',
})
export class PricingPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // document.title = 'Pricing Pokemon SSR';
    // console.log(isPlatformServer(this.platformId));
    this.title.setTitle('Pricing Pokemon SSR');
    this.meta.updateTag({
      name: 'description',
      content: 'Pricing Pokemon SSR Angular Application',
    });
  }
}
