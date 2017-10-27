import { AngularFireDatabase } from 'angularfire2/database';
import {Injectable, Inject} from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {UserInfo} from "./user-info";
import { Observable, Subject, BehaviorSubject } from "rxjs";

@Injectable()
export class AuthService {
    static UNKNOWN_USER = {
        isAnonymous: true,
        email: null,
        displayName: null,
        providerId: null,
        uid: null,
        isAdmin: false
    };

    userInfo = new BehaviorSubject<UserInfo>(AuthService.UNKNOWN_USER);
    private user: firebase.User;

    constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("user: ", JSON.stringify(user));
            this.user = user;
            let userInfo = new UserInfo();
            if (user != null) {

                userInfo.isAnonymous = user.isAnonymous;
                userInfo.email = user.email;
                userInfo.displayName = user.displayName;
                userInfo.providerId = user.providerId;
                userInfo.photoURL = user.photoURL;
                userInfo.uid = user.uid;
            } else {
                this.user = null;
                userInfo.isAnonymous = true;
            }
            this.userInfo.next(userInfo);
        });
    }

    login(email: string, password: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                let user = this.mapAuthResultToUserInfo(auth);
                this.insereUsuarioSeEleNaoExistir(user);
                result.next("success");
            })
            .catch(err => result.error(err));
        return result.asObservable();
    }

    insereUsuarioSeEleNaoExistir(user: UserInfo) {
        let uid = user.uid;
        this.db.list('usuarios/' + uid).subscribe(
            (snap) => {
                if (snap.length == 0) {
                    this.db.list('usuarios/' + uid).push(user);
                }
            },
            () => console.error('erro')
        );
    }

    currentUser(): Observable<UserInfo> {
        return this.userInfo.asObservable();
    }

    logout(): Observable<string> {
        let result = new Subject<string>();
        this.userInfo.next(AuthService.UNKNOWN_USER);
        this.angularFireAuth.auth.signOut()
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    isLoggedIn(): Observable<boolean> {
        return this.userInfo.map(userInfo => !userInfo.isAnonymous);
    }

    updateDisplayName(displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updateProfile({displayName: displayName, photoURL: null})
            .then(() => {result.next("success")})
            .catch(err => result.error(err));
        return result;
    }

    createUser(email: string, password: string, displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("Update: ", user);
            if (user != null) {
                user.updateProfile({displayName: displayName, photoURL: null});
            }
        });
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                //auth.auth.updateProfile({displayName: displayName, photoURL: null});
                result.next("success");
            })
            .catch(err => result.error(err));

        return result.asObservable();
    }

    updateEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updateEmail(email)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    updatePassword(password: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updatePassword(password)
                .then(a => {
                    result.next("success");
                })
                .catch(err => result.error(err));
        return result.asObservable();
    }

    sendPasswordResetEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.sendPasswordResetEmail(email)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result;
    }

    loginViaProvider(provider: string): Observable<String> {
        let result = new Subject<string>();
        result.error("Not a supported authentication method: " + provider)
        return result.asObservable();
    }
    mapAuthResultToUserInfo(result: any) : UserInfo {
        let userInfo = new UserInfo();
        userInfo.email = result.email;
        userInfo.displayName = result.displayName;
        userInfo.photoURL = result.photoURL;
        userInfo.uid = result.uid;

        userInfo.isAdmin = result.isAdmin || false;

        return userInfo;
    }
}
