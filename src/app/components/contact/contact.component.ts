import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  fb = inject(FormBuilder);

  contactForm!: FormGroup;

  ngOnInit(){
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      text: ['', Validators.required]
    })
  }

  sendMessage() {
    if (this.contactForm.valid) {
      const { name, phone, email, text } = this.contactForm.value;
      const message = encodeURIComponent(`Nome: ${name}\nCelular: ${phone}\nE-mail: ${email}\nMensagem: ${text}`);
      const whatsappUrl = `https://wa.me/5575991100958?text=${message}`;

      const newWindow = window.open(whatsappUrl, '_blank');
      if (!newWindow) {
        alert('Não foi possível abrir o WhatsApp. Verifique as configurações do navegador.');
      } else {
        alert('Mensagem enviada pelo WhatsApp com sucesso!');
        this.contactForm.patchValue({ text: '' });
      }
    } else {
      alert('Por favor, preencha o formulário corretamente.');
    }
  }

  sendMail() {
    if (this.contactForm.valid) {
      const { name, phone, email, text } = this.contactForm.value;
      const subject = encodeURIComponent(`Mensagem de Contato - ${name}`);
      const body = encodeURIComponent(
        `Nome: ${name}\nCelular: ${phone}\nE-mail: ${email}\nMensagem: ${text}`
      );
      const mailtoUrl = `mailto:fokhustech@gmail.com?subject=${subject}&body=${body}`;

      const newWindow = window.open(mailtoUrl, '_blank');
      if (!newWindow) {
        alert('Não foi possível abrir o cliente de e-mail. Verifique as configurações do navegador.');
      } else {
        alert('Mensagem enviada por e-mail com sucesso!');
        this.contactForm.patchValue({ text: '' });
      }
    } else {
      alert('Por favor, preencha o formulário corretamente.');
    }
  }


}
