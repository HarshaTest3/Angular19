import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) {

   }
  loginUser = ""
  getApiData(){
     return this.http.get('https://json-placeholder.mock.beeceptor.com/users')
  }
  
  getPostCall(carObj:any){
    const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
     this.http.post("https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCar", carObj, httpOptions).subscribe((data:any)=>{
       //this.carList.set(data)
        console.log("Car added successfully", data);
    },(errors?:any)=>{
        console.error("Error adding car", errors);
    })
  }
}
