import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'side-menu',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1>Side Menu</h1>
    `,
})
export class SideMenuComponent {
}
