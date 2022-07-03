import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() userName = '';
  addUserForm: FormGroup;
  modalRef?: BsModalRef;

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService, private modalService: BsModalService) {
    this.addUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('USER')
    });
  }

  ngOnInit(): void {
  }

  logout = async () => {
    await this.authService.logout();
    localStorage.removeItem('AUTH_FMV');
    this.toast.success('Successfully Logged out');
    this.router.navigate(['/sign-in']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addUser = async () => {
    console.log(this.addUserForm.value);

    const res = await this.authService.signUp(this.addUserForm.value);
    const data = await this.authService.getCurrentLoggedInUser();
    this.addUserForm.patchValue({
      name: '',
      email: '',
      password: '',
      role: 'USER'
    })
  }
}
