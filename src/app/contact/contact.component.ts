import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    })
  }


  sendEmail() {
    let formData: any = new FormData();
    formData.append('toEmail', this.contactForm.get('toEmail')?.value);
    formData.append('subject', this.contactForm.get('subject')?.value);
    formData.append('body', this.contactForm.get('body')?.value);

    this.emailService.sendEmail(formData).subscribe({
      next:()=>{
        debugger
        alert("Email Sent Successfully!");
        this.contactForm.reset();
      },
      error:()=>{
        alert("Error Email Sending!");
      },
    })
  }




}
