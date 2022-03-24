import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {filter, Observable, switchMap} from "rxjs";
import {createPasswordStrengthValidator} from '../customValidation/passwordStrengthValidator'
import {compareStartEndDates} from '../customValidation/compareDates'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

    //Form all FormGroup
    this.loginForm.valueChanges.pipe(
      filter((obj) => obj.email && obj.password),
      switchMap(val => this.loginForm.statusChanges.pipe(
        filter((status: string) => val.password.length > 3),
      )),
    ).subscribe(console.log)


    //Chechk values for single FormControler.

    this.password?.valueChanges.pipe(
      switchMap( (val) => <Observable<any>>this.password?.statusChanges.pipe(
        filter(() => val.length > 3)
      ))
    ).subscribe(console.log)

    //Check status changes

    // this.loginForm.statusChanges.pipe(
    //   filter(val => val === 'VALID')
    // ).subscribe(console.log)

    //check Value changes
    // this.loginForm.valueChanges.subscribe(console.log)
  }

  loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required],
        // updateOn: 'blur'
      }),
      password: new FormControl('', [Validators.required, Validators.minLength(5),
        createPasswordStrengthValidator()]),
      address: new FormGroup({
        city: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")],),
        street: new FormControl('', [Validators.required]),
      }),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      skillsArr: new FormArray([this.onAddSkills()])
    },
    {validators: [compareStartEndDates()]}
  )

  get password() {
    return this.loginForm.get('password')
  }

  get city() {
    return this.loginForm.get('address.city') as FormControl
  }

  get skills(): FormArray {
    return this.loginForm?.get('skillsArr') as FormArray
  }

  onAddSkills(): FormGroup {
    const formGoup = new FormGroup({
        personalSkills: new FormControl('', [Validators.required])
      }
    )
    this.skills?.push(formGoup)
    return formGoup
  }

  removeSkill(i: number): void {
    this.skills.removeAt(i);
  }

  setDefaultValue(): void {
    this.loginForm.setValue({
      email: 'angular_course@epam.com',
      password: 'Aa123',
      address: {city: "Yerevan", street: "Khorencai 15"},
      startDate: '5',
      endDate: '7',
      skillsArr: [{personalSkills: 'programmer'}]
    }, {onlySelf: true, emitEvent: false})
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
    }
  }
}
