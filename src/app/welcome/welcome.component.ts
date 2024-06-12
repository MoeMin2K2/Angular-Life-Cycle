import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-welcome',
    standalone: true,
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.css',
    imports: [RouterModule, MatToolbarModule, MatIconModule]
})
export class WelcomeComponent {
    email: string = "support@myapplication.com";

    constructor(private router: Router) {

    }

    logOut() {
        console.log("Logout Function is Called.")
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        console.log("After Logged Out Token: ", localStorage.getItem('token'));
    }
}
