import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Router} from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import IdTokenResult = firebase.auth.IdTokenResult;

@Injectable()
export class AuthService {
    public user$: Observable<firebase.User | null>;
    public isAdmin = false;
    public displayName?: string;
    public user?: firebase.User;

    constructor(private fireAuth: AngularFireAuth,
                private router: Router) {

        this.user$ = fireAuth.user;
    }

    signInRegular(email: string, password: string) {
        return from(this.fireAuth.signInWithEmailAndPassword(email, password));
    }

    isLoggedIn() {
        return this.fireAuth.authState;
    }

    logout() {
        this.fireAuth.signOut()
            .then(() => {
                this.router.navigate(['/'], {replaceUrl: false});
            });
    }

    getToken(): Observable<string | null> {
        return this.fireAuth.idToken;
    }

    getTokenResult(): Observable<IdTokenResult | null> {
        return this.fireAuth.idTokenResult;
    }
}
