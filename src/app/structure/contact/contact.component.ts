import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailThisService } from 'src/app/services/mail-this.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formContact!: FormGroup;

  patternEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  subject: string[]=['Bug Reports & Technical Errors', 'Database Problems', 'Suggestions for Features/Changes'];

  confirmation!: string;

  loading: boolean = false;

  constructor(private serviceMail: MailThisService) {
    this.formContact = this.createFormContact()
   }

  createFormContact(){
    return new FormGroup({
      messaje: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(240)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.patternEmail)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      issues: new FormControl('', Validators.required),
      nameAnime: new FormControl('', Validators.required),
    })
  }

  get messaje(){
    return this.formContact.get('messaje');
  }

  get email(){
    return this.formContact.get('email');
  }

  get username(){
    return this.formContact.get('username');
  }

  get issues(){
    return this.formContact.get('issues');
  }

  get nameAnime(){
    return this.formContact.get('nameAnime');
  }

  changeSubject(e:any){

    this.issues?.setValue(e.value,{
      onlySelf:true
    })
  }

  ngOnInit(): void {  }

  sendForm(){
    this.loading = true;

    let dataForm = {
      _replyto: this.formContact.value.email,
      name: this.formContact.value.username,
      _subject: this.formContact.value.issues,
      message:this.formContact.value.messaje,
    }

    this.serviceMail.mailThis(dataForm).subscribe(res=>{
        if(res){
          this.resetForm()
          location.href = 'https://mailthis.to/confirm';
        }
    })
  }

  resetForm(){
    this.loading = false;
    this.formContact.reset()
  }




}
