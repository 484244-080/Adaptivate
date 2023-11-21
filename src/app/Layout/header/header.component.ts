import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/DTO/user.dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: User = {};

  constructor(private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  logout() {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure sign out from System?',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      }
    });
  }
}
