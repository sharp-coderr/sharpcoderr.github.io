import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/account/user';
import { ConfirmEmail } from 'src/app/shared/models/account/confirmEmail';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup = new FormGroup({});
  submitted = false;
  errorMessages:string[] = [];
  constructor(
    private accountService:AccountService
    ,private formBuilder:FormBuilder
    ,private sharedService:SharedService
    ,private router:Router)
  {

  }
  register(){
    this.submitted = true;
    this.errorMessages = [];
    if(this.registerForm.valid){
    this.accountService.register(this.registerForm.value).subscribe({
      next:(response:any)=>{
        this.sharedService.showNotification(true,response.value.title,response.value.message)
        this.router.navigateByUrl("account/login");
        console.log(response);
      },
      error:error=>{
        console.log(error);

        if(error.error.errors){
          this.errorMessages = error.error.errors;
        }
        else
          this.errorMessages.push(error.error);
      }
    })
    }
    
  }
  ngOnInit(): void {
    this.accountService.user$.subscribe({
      next: (user: User | null) => {
        if (user)
          this.router.navigateByUrl("/");
      }
    })
    this.initializeForm();
  }
  initializeForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      lastName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      email: ['',[Validators.required,Validators.pattern("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$")]],
      password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]],
    })
  }

}
