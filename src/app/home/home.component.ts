import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title;
  inpvalue: number = 1;  
  constructor() { }

  ngOnInit() {
    this.title="wel-Come";
  }
  isBold: boolean = true;    
    fontSize: number = 30;    
    isItalic: boolean = true;    
    
    MyStyle() {    
      console.log("MyStyle");
        let mystyles = {    
            'font-weight': this.isBold ? 'bold' : 'normal',    
            'font-style': this.isItalic ? 'italic' : 'normal',    
            'font-size.px': this.fontSize    
        };    
    
        return mystyles;    
    }
    
    applyBoldClass: boolean = true;    
    applyItalicsClass: boolean = true;    
    
    applyClasses() {    
        let classes = {    
            boldClass: this.applyBoldClass,    
            italicsClass: this.applyItalicsClass    
        };    
    
        return classes;    
    }    

}
