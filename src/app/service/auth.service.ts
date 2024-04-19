import { Injectable, inject, signal } from '@angular/core';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePhoneNumber, updateProfile, user } from '@angular/fire/auth';
import { response } from 'express';
import { Observable, from, of, tap } from 'rxjs';
import { UserInterFace } from '../data/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterFace | null | undefined>(undefined)

  getCurrentUserId(): string | null {
    const user: User | null = this.firebaseAuth.currentUser;
    return user ? user.uid : null;
  }

  register(fullName: string,
    email: string,
    password: string,
    aadharCardNo: string,
    mobileNo: string,
    birthdate: string,
    profilePic: string): Observable<void> {
      const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password,).then
      (response => updateProfile(response.user, {displayName: fullName}))
      return from(promise)
    }


    login(email: string, password: string): Observable<void>{
      const promise = signInWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password,
      ).then(() =>{});
      return from(promise)
    }


    login2(email: string, password: string): Observable<boolean> {
      // Fixed email and password for department login
      const departmentEmail = 'admin@gmail.com';
      const departmentPassword = '123456789';

      // Check if the provided credentials match the department login
      if (email === departmentEmail && password === departmentPassword) {
        // If the login is successful, return true
        return of(true);
      } else {
        // Return false if credentials don't match
        return of(false);
      }
    }

    logout(): Observable<void> {
      return from(this.firebaseAuth.signOut());
    }

}
