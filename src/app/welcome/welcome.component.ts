import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
    selector: 'app-welcome',
    standalone: true,
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.css',
    imports: [RouterModule,MatToolbarModule]
})
export class WelcomeComponent {
        email: string = "support@myapplication.com";
}
