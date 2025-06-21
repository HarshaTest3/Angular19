import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component,OnInit,OnDestroy, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule,NgStyle],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit,AfterContentInit,AfterViewInit,AfterViewChecked,AfterContentChecked,OnDestroy{
  firstName: string = 'Harsha'
  lastName: string = 'Kumar'
  form:FormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    userName: new FormControl('',[Validators.email, Validators.required]),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('Goa'),
    zip: new FormControl('',Validators.required),
    isValid: new FormControl(false)
  });
  @Input() progressValue: number = 0;
  @Output() progressValueChange = new EventEmitter<number>()
  progressIncDec:number = 0
  constructor(private appService:AppService) {
    console.log("Constructor called");
  }
  onClick() {// for api call functionality
    window.alert('Welcome to the User Page');
  }
  onChange(event: any){
    console.log(event.target.value)
  }
  ngOnInit():void{//component initialization
    console.log("ngOnInit called")
    this.appService.getApiData().subscribe((data:any)=>{
      console.log("Data fetched successfully", data);
    })
  }
  ngAfterContentInit(): void {//external content initilized
    console.log("ngAfterContentInit called");
  }
  ngAfterContentChecked(): void {//external content checked(after external content properly loaded)
    console.log("ngAfterContentChecked called");
  }
  ngAfterViewInit(): void {//view initialized(ViewChild and getting refrence of element)
    console.log("ngAfterViewInit called", performance.now());
    
  }
  ngAfterViewChecked(): void {//view checked
    console.log("ngAfterViewChecked called");
  }
  ngOnDestroy(): void {//component destroyed(when we redirect from one component to another)
    console.log("ngOnDestroy called");
    alert("Component is destroyed");
  }
  increaseProgress(){
    
    this.progressIncDec += 10;
    this.progressValueChange.emit(this.progressIncDec);
    
  }
  decreaseProgress(){
    this.progressIncDec -= 10;
    this.progressValueChange.emit(this.progressIncDec);
  }

}
