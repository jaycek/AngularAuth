import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialevents=<any>[];
  constructor(private _event:EventService,private _router:Router) { }

  ngOnInit(): void {
    this._event.getSpecialEvents()
    .subscribe(
      res=>this.specialevents=res,
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status==401){
            this._router.navigate(['/login']);
          }
        }
      }
    )

  }


}
