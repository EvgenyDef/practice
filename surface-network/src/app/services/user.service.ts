// import { HttpClient } from "@angular/common/http";
// import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
// import { Router } from "@angular/router";

// export interface UserInfo {
//     login: string;
//     photo: string;
//     authData: string;
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class UserService {

//     @Output() errors: EventEmitter<any> = new EventEmitter();

//     @Output() authChanged: EventEmitter<any> = new EventEmitter();

//     constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string, private router: Router) {};

//     login(login: string, password: string) {
//         const formData = new FormData();

//         formData.append('login', login);
//         formData.append('password', password);

//         const storage = localStorage;

//         this.http.post(this.baseUrl + '/login', formData).subscribe({
//             next: (user: any) => {
//                 const authData = window.btoa(login + ':' + password);
//                 const userInfo: UserInfo = { login: login, photo: user.photo, authData: authData};
//                 storage.setItem('userInfo', JSON.stringify(userInfo));
//                 storage.setItem('isAuthentificated', 'true');

//                 this.authChanged.emit();

//                 this.router.navigate(['']);
//             },
//             error: (e) => {
//                 this.errors.emit(e);
//             }
//         });
//     }

//     logout() {
//         localStorage.removeItem('userInfo');
//         localStorage.removeItem('isAuthentificated');

//         this.authChanged.emit();
//         this.router.navigate(['']);
//     }

//     isAuthentificated(): boolean {
//         const isAuthentificatedLocal = localStorage.getItem('isAuthentificated') == 'true';
//         return isAuthentificatedLocal;
//     }

//     getUserInfo(): UserInfo {
//         let user = JSON.parse(localStorage.getItem('userInfo')!) as UserInfo;
//         return user;
//     }

// }

import { HttpClient } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";

export interface UserInfo {
    login: string;
    photo: string;
    authData: string;
    userId: number;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    @Output() errors: EventEmitter<any> = new EventEmitter();
    @Output() authChanged: EventEmitter<any> = new EventEmitter();

    constructor(
        private http: HttpClient,
        @Inject("BASE_API_URL") private baseUrl: string,
        private router: Router
    ) { };

    // 1. Измененный метод входа (отправляет JSON вместо FormData)
    // login(login: string, password: string) {
    //     const loginData = {
    //         nickname: login,
    //         password: password
    //     };

    //     this.http.post(this.baseUrl + '/api/auth/login', loginData).subscribe({
    //         next: (user: any) => {
    //             const authData = window.btoa(login + ':' + password);
    //             const userInfo: UserInfo = { login: login, photo: user.photo, authData: authData};

    //             localStorage.setItem('userInfo', JSON.stringify(userInfo));
    //             localStorage.setItem('isAuthentificated', 'true');

    //             this.authChanged.emit(); // Уведомляем шапку сайта
    //             this.router.navigate(['']); // Перенаправляем на главную
    //         },
    //         error: (e) => {
    //             this.errors.emit(e); // Передаем ошибку в компонент
    //         }
    //     });
    // }
    
    login(login: string, password: string) {
        console.log("Вызван метод login")
        const loginData = { nickname: login, password: password };

        this.http.post(this.baseUrl + '/login', loginData).subscribe({
            next: (user: any) => {
                const authData = window.btoa(login + ':' + password);
                const userInfo: UserInfo = { login: login, photo: user.photo, authData: authData, userId: user.userId };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                localStorage.setItem('isAuthentificated', 'true');

                this.authChanged.emit(); 

                this.router.navigate(['']);
            },
            error: (e) => {
                this.errors.emit(e);
            }
        });
    }


    register(registerData: any) {
        console.log("регистрация")
        this.http.post(this.baseUrl + '/register', registerData).subscribe({
            next: (response: any) => {
                console.log('Регистрация успешна', response);
                //alert('Регистрация прошла успешно!');
                this.login(registerData.nickname, registerData.password);
                this.router.navigate(['']); 
            },
            error: (e) => {
                this.errors.emit(e);
            }
        });
    }

    logout() {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAuthentificated');
        this.authChanged.emit();
        this.router.navigate(['/login']);
    }

    isAuthentificated(): boolean {
        return localStorage.getItem('isAuthentificated') == 'true';
    }

    getUserInfo(): UserInfo {
        return JSON.parse(localStorage.getItem('userInfo')!) as UserInfo;
    }
}