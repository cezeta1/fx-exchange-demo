import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'nav-bar',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1>Nav-bar</h1>
    `,
})
export class NavBarComponent {
}
