import {Component, AfterViewInit} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {Observable, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import { UserInfo } from "app/shared/user-info";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit{
    userInfo: Observable<UserInfo>;
    isLoggedIn = new BehaviorSubject(false);

    constructor(private authService: AuthService, private router: Router) {
        this.userInfo = authService.userInfo;
        this.userInfo
            .map(userInfo => !userInfo.isAnonymous)
            .subscribe(this.isLoggedIn);
    }

    ngAfterViewInit(){
        let el = document.getElementById('efeito');
        let temp = el.innerText;
        el.innerText = "";

        var char = temp.split('').reverse();
        var typer = setInterval(function () {
            if (!char.length) return clearInterval(typer);
            var next = char.pop();
            el.innerHTML += next;
        }, 75);
    }

    navigateToLogin(e) {
        this.router.navigate(['/login']);
        e.preventDefault();
    }

    navigateToRegister(e) {
        this.router.navigate(['/register']);
        e.preventDefault();
    }
}
