import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {takeUntil} from 'rxjs/operators';
import {UiService} from '../../services/ui.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    user = {
        email: '',
        password: '',
        displayName: '',
    };

    unsubscribe = new Subject<void>();

    constructor(public authService: AuthService,
                public uiService: UiService,
                public toastController: ToastController
    ) {
    }

    userForm = new FormGroup({
        emailFormControl: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        displayName: new FormControl('', [
            Validators.required,
        ]),
        passwordFormControl: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
        ])
    });


    ngOnInit() {
        
    }

    signInWithEmail() {
        this.authService.signInRegular(this.user.email, this.user.password)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                
                this.user.email = '';
                this.user.password = '';
            }, async err => {
                const toast = await this.toastController.create({
                    message: err.message,
                    duration: 2000,
                    color: 'danger',
                    position: 'top',
                    cssClass: 'hes-toast',
                    animated: true,
                    mode: 'md'
                });
                toast.present();
            });
    }


    logout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}

