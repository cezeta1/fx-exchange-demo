import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'page-footer',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzIconModule],
  template: `
    <nz-footer class="cz-footer">
      Julián Czerweny ©2023 ||
      <a
        href="https://github.com/Cezeta-hub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span
          nz-icon
          nzType="github"
          nzTheme="fill"
          class="cz-footer-icon"
        ></span>
      </a>
      <a
        href="https://www.linkedin.com/in/cezeta/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span
          nz-icon
          nzType="linkedin"
          nzTheme="fill"
          class="cz-footer-icon"
        ></span>
      </a>
    </nz-footer>
  `,
  styles: `
    .cz-footer {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      color: #696969;
    }
    .cz-footer a {
      color: inherit;
    }
    .cz-footer-icon {
      margin-left: 0.5rem;
    }
  `,
})
export class FooterComponent {}
