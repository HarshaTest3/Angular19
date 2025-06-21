import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, linkedSignal, signal, inject, resource,AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppService } from '../services/app.service';
import { CustomPipePipe } from './custom-pipe.pipe';
import { UserComponent } from "../user/user.component";
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, DropdownModule, CustomPipePipe, UserComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements AfterViewInit {
  cities: string[] = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
  selectedCity: string = '';
  formData: any = {
    firstName: '',
    lastName: '',
    userName: '',
    city: '',
    state: '',
    zip: '',
    isValid: false,
  }
  controlFlowToggleShow: boolean = false;
  controlFlowToggleHide: boolean = false;
  signalFirstName = signal("Harsha")
  rollNo = signal<number>(0)
  signalLastName:string="Kumar"
  linkFirstName = signal("Harsha")
  linkLastName = signal("Vardhan")
  fullName = linkedSignal({
    source: this.linkFirstName,
    computation: (newOptions, previous) => {
      const fullName = newOptions + " " + this.linkLastName()
      return fullName
    }
  })
  carObj = {
  "carId": 4822,
  "brand": "Indo",
  "model": "Suziki",
  "year": 2025,
  "color": "Red",
  "dailyRate": 10,
  "carImage": "string",
  "regNo": ""
}
carObj2 = [this.carObj]
  user = signal({id:123, name:"rockstar"})
  email = linkedSignal({
    source:this.user,
    computation: user=>`${user.name+user.id}@gmail.com`,
    equal:(a:any,b:any)=>a.id!==b.id
  })
  userList = signal<any[]>([])
  products:any[] = []
  carList = signal<any[]>([])
  http = inject(HttpClient)
  resourceApiList = resource({
    loader:()=>{
      return fetch("https://json-placeholder.mock.beeceptor.com/users")
      .then(res=> res.json() as Promise<any[]>)
    }
  })
  pipeFirstName = "Harsha"
  datePipe:Date = new Date();
  progressVal:number = 0
  userData$:Observable<any[]> | undefined
  constructor(private appService:AppService) {
    setTimeout(() =>{
      this.signalLastName="Kumar changed"
      //this.signalFirstName.set("Harsha changed")
    },2000)
    this.rollNo.update(oldval => oldval + 1)
    this.userData$ = this.getProductsData2()
  }
  onCityChange(event: any) {
    console.log(this.selectedCity, event)
  }
  submit(){
    console.log(this.formData);
    
  }
  handleFlow(event: any) {
  this.controlFlowToggleShow = event
  }
  handleLinkClick(){
    this.linkFirstName.set("Happy")
  }
  handleLinkClick2(){
    this.user.set({id:333,name:"test"})
  }
  // getApiData(){
  //    this.http.get('https://json-placeholder.mock.beeceptor.com/users').subscribe((data:any)=>{
  //     this.userList.set(data)
  //    })
  // }
  getProductsData(){
    return this.http.get('https://fake-store-api.mock.beeceptor.com/api/products')
  }
  getProductsData2(): Observable<any[]> {
    return this.http.get<any[]>('https://fake-store-api.mock.beeceptor.com/api/products');
  }
  editUser(user:any){
    console.log("Edit User: ",user);
  }
  deleteUser(id:number){
    this.userList.set(this.userList().filter(user=> user.id !== id))
  }
  // getAsynCall(){
  //    this.getApiData().subscribe((data:any)=>{
  //     this.userList = data;
  //   })
  //    this.getProductsData().subscribe((data:any) => {
  //     this.products = data;
  //   })
  // }
  getAllCars(){
    
     this.appService.getApiData().subscribe((data:any)=>{
      this.userList = data
     })
     const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
    //  this.http.post("https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCar", this.carObj, httpOptions).subscribe((data:any)=>{
    //    //this.carList.set(data)
    //     console.log("Car added successfully", data);
    // },(errors?:any)=>{
    //     console.error("Error adding car", errors);
    // })
    this.http.get<any[]>('assets/cars.json').subscribe((data:any)=>{
       this.carList.set(data)
    })
    
  }
  updateCar(car:any){
    this.http.put('https://freeapi.miniprojectideas.com/api/CarRentalApp/UpdateCar', car).subscribe((data:any)=>{
      console.log("Car updated successfully", data);
    })
  }
  deleteUserById(id:number){
    const isDelete = confirm("Are you sure you want to delete this user?")
    if (isDelete) {
      this.http.delete('https://freeapi.miniprojectideas.com/api/CarRentalApp/DeleteCarbyCarId/' + id).subscribe((data: any) => {
        if (data.result) {
          alert("Car deleted successfully")
          this.appService.getApiData().subscribe((data:any)=>{
            this.userList = data
          })
        } else {
          alert("Error deleting car")
        }
      })
    }
  }
  reloadResource(){
    this.resourceApiList.reload()
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called", performance.now());
  }
  progressValueChange(event:any){
    this.progressVal = event;
    
  }
  
}
