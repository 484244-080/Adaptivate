import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../DTO/user.dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  accountList = [
    {
      username: 'admin',
      name: 'Admin',
      password: 'P@$$w0rd',
    },
    {
      username: 'user1',
      name: 'User 1',
      password: 'P@$$w0rd',
    },
    {
      username: 'user2',
      name: 'User 2',
      password: 'P@$$w0rd',
    },
  ];

  signIn(user: User) {
    const findUsers = this.accountList.filter(
      (item) => item.username == user.username && item.password == user.password
    );

    if (findUsers.length > 0) {
      const findUser = {
        name: findUsers[0].name,
      };

      localStorage.setItem('user', JSON.stringify(findUser));
      this.router.navigate(['risk-score']);
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Authentication Failed.',
      });
    }
  }
  getUser() {
    return localStorage.getItem('user');
  }

  async removeUser() {
    await localStorage.removeItem('user');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('user');
    // console.log(authToken);
    return authToken !== null ? true : false;
  }
}
