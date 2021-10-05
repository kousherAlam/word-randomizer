import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'word-randomizer';
  allLetter = 'abcdefghijklmnopqrstuvwxyz';
  letter = 5;

  interval: any = null;

  fabs: string[] = [];

  ngOnInit(){
    const fabs = window.localStorage.getItem('fabs');
    if(fabs){
      this.fabs = JSON.parse(fabs);
    }
    this.toggleInterVal();
    window.addEventListener('keydown', (e)=>{
      console.log(e.code);

      if(e.code.toLowerCase() === 'enter'){
        this.toggleInterVal();
      }
      if(e.code.toLowerCase() === 'space'){
        this.addToFab();
      }
    })
  }

  public toggleInterVal(){
    if(this.interval === null){
      this.interval = setInterval(()=>{
        this.generate();
      }, 3000);
    } else {
      clearInterval(this.interval);
      this.interval = null;
    }
  }


  generate(){
    const lArr = this.allLetter.split('');

    let name = '';
    for(let i = 0; i<this.letter; i++){
      const num1 = Math.floor(Math.random() * lArr.length);
      name = name + lArr[num1];
    }
    this.title = name;
  }

  ngOnDestroy(){
    if(this.interval !== null){
      clearInterval(this.interval);
    }
  }

  addToFab(){
    this.fabs.push(this.title);
    window.localStorage.setItem('fabs', JSON.stringify(this.fabs));
  }

  clear(index:number){
    this.fabs.splice(index, 1);
    window.localStorage.setItem('fabs', JSON.stringify(this.fabs));
  }
}
