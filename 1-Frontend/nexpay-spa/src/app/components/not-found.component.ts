import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;
        height: 100%;
      "
    >
      <div class="cz-404">404</div>
      <div>Oops! Page not found</div>
      <div><a href="./">Go to homepage</a></div>
    </div>
  `,
  styles: `
    .cz-404 {
      font-weight: 800;
      font-size: xxx-large;
      color: #177ddc;
    }
  `,
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
