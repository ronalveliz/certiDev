import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { USUARIO } from '../model/usuario.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario: USUARIO[] = [];



  registerForm = new FormGroup({
      nombreCompleto: new FormControl('',[Validators.required, Validators.minLength(5)]),
      correo: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
      contraConfirmada: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(30)]),
      edad: new FormControl(null , [
        Validators.required, 
        Validators.pattern('(1[8-9]|[2-5][0-9]|60)'),
      (control: AbstractControl) =>{
        const edad = control.value;
        if(edad < 18){
          return { menorDeEdad: true };
        }
      }
    ]),
      genero:new FormControl(''),
      suscripcion: new FormControl('Noticias'),
      pais: new FormControl(''),
      fechaNacimiento: new FormControl(new Date()),
    },
    { validators: this.contraConfirmadaValidator}
  );

  
  contraConfirmadaValidator(control: AbstractControl){
  
      if(control.get('password')?.value === control.get('contraConfirmada')?.value){
      return null;
  
      }else{
        return{
          'confirmError': true
        }
      }
    }
     
     save(){
      const register: USUARIO = this.registerForm.value as unknown as USUARIO;
     }
}
