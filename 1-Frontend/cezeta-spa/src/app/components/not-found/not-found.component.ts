// Angular
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  template: `
    <div class="cz-not-found">
      <div class="cz-404">404</div>
      <div>Oops! Page not found</div>
      <div><a href="./">Go to homepage</a></div>
    </div>
  `,
  styles: `
    .cz-not-found {
      display: flex;
      flex-direction: column;
      justify-content: center; 
      align-items: center;
      height: 100%;
    }
    .cz-404 {
      font-weight: 800;
      font-size: xxx-large;
      color: #177ddc;
    }
  `,
})
export class NotFoundComponent {}