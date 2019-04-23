import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * For an administrator to log in the system.
 * The page asks for an email and a password, then request the
 * server for authentication.
 * It will store a JWT token locally on success.
 *
 * @author Chonghan Chen
 *
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
  ) {
  }

  /**
   * Initializes the component.
   * Specifies accepted input username and password. Invalid input
   * will not be sent to the server.
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Get the data in the formBuilder object.
   */
  get formData() {
    return this.loginForm.controls;
  }

  /**
   * Called when the user submits the login form.
   * It checks for input validity, then send valid username and password to
   * the server. If login is successful and a jwt token is returned, it stores it
   * locally for future use.
   */
  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Username and password required!');
      return;
    }

    // TODO:
    this.authenticationService.login(this.formData.username.value, this.formData.password.value)
      .subscribe(
        res => {

          localStorage.setItem('id_token', res.data.token);
          this.router.navigate(['admin/']);
        },
        res => {
          alert(res.error.err.message + 'Wrong username or password');
          return;
        });
  }

}
