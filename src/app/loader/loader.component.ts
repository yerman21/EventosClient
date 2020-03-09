import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../_services/loader.service';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{
  color:string = "info";
  mode:string = "indeterminate";
  isLoading:Subject<boolean>;
  value:number = 95;//1;

  constructor(private loaderService:LoaderService, private configProgress:NgbProgressbarConfig) { 
    this.isLoading = this.loaderService.isLoading;
    // customize default values of progress bars used by this component tree
    configProgress.max = 100;
    // configProgress.striped = true;
    // configProgress.animated = true;
    configProgress.type = this.color;
    configProgress.height = '1em';
  }

  ngOnInit() {
    // console.log(this.configProgress.max);
    // do{
    //   setTimeout( () =>  this.value +=5 , 100);
    // } while(this.value < this.configProgress.max);
    // this.loadProgress();
  }

  loadProgress(){
    this.value = 1;
    do{
      if(this.value % 5 == 0){
        this.value +=5;
      }else if(this.value % 3 != 0){
        this.value += 2;
      }else{
        this.value += 1;
      }
      console.log("value->", this.value);
    } while(this.value <= this.configProgress.max);
    return this.value;
  }

}
