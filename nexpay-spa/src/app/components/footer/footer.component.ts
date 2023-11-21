import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'page-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
  ],
  template: `
    <div class="cz-footer">
        Julián Czerweny ©2023 || 
        <a href="https://github.com/Cezeta-hub" target="_blank" rel="noopener noreferrer">
            <span nz-icon nzType="github" nzTheme="fill" class="cz-footer-icon"></span>
        </a>
        <a href="https://www.linkedin.com/in/cezeta/" target="_blank" rel="noopener noreferrer">
            <span nz-icon nzType="linkedin" nzTheme="fill" class="cz-footer-icon"></span>
        </a>
    </div>
  `,
  styles: `
    .cz-footer {
        color: #696969;
    }
    .cz-footer a {
        color: inherit;
    }
    .cz-footer-icon {
        margin-left: 0.5rem;
    }
  `
})
export class FooterComponent {}
