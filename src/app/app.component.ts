import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crazy-candy';
  band:boolean=true;
  change(e:any){
    e.preventDefault();
    this.band?this.band=false:this.band=true;
  }
}
