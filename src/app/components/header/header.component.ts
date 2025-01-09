import { animate, state, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('slideNav', [
      state('closed', style({ transform: 'scaleY(0)', opacity: '0', transformOrigin: 'top' })),
      state('open', style({ transform: 'scaleY(1)', opacity: '1', transformOrigin: 'top' })),
      state('static', style({transform: 'none', opacity: '1'})),
      transition('closed <=> open', animate('500ms ease-in-out')),
    ]),
  ]
})
export class HeaderComponent {
  navState = signal('closed');
  isLgScreen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  toggleNav() {
    this.navState.set(this.navState() === 'closed' ? 'open' : 'closed');
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLgScreen.set(window.innerWidth >= 640); // Tailwind's sm breakpoint
      if (this.isLgScreen()) {
        this.navState.set('static'); // Keep nav visible and static
      } else {
        this.navState.set('closed'); // Reset to closed for smaller screens
      }
    }
  }

  @HostListener('click', ['$event'])
  onLinkClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      event.preventDefault();
      const sectionId = target.getAttribute('href')?.substring(1);
      const section = document.getElementById(sectionId || '');

      if (section) {
        const headerHeight = document.querySelector('header')?.clientHeight || 0;
        const offsetTop = section.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  }
}
