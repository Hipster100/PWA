import {Component, OnInit} from '@angular/core';
import {selector} from "rxjs/operator/publish";
import { Observable } from 'rxjs/Observable';
import {Http, Headers} from "@angular/http";
import { devModeEqual } from '@angular/core/src/change_detection/change_detection_util';
import { TextDecoder, TextEncoder } from 'text-encoding'
'use strict'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';
  myArticles = [];
  mySource = [];



  constructor(protected http: Http) {
  
  }


  ngOnInit(): void {
    const sourceSelector = document.querySelector('#sourceSelector');

    this.updateNews('Wired');
    this.updateSource();

    if('serviceWorker' in navigator){ //do we have support for it
    try{
      navigator.serviceWorker.register('sw.js');
      console.log('service registered');
    } catch(error) {
      console.log('service failed');
    }
    }

  }


  updateNews(source): any {
    const url  = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=a0d3c2bbdf6f4a9f9137b2280874af9f`;

    let headers = new Headers({'Access-Control-Allow-Origin': '*'});

    // const results;
    return this.http.get(url).subscribe(res => {

      // console.log(res.json());
      const result = res.json();

      console.log(result);

      this.myArticles = result.articles;

    })

  }

  updateSource(): any {
    const url  = `https://newsapi.org/v2/sources?language=en&country=us&apiKey=a0d3c2bbdf6f4a9f9137b2280874af9f`;

    return this.http.get(url).subscribe(res => {

      const result = res.json();
      console.log(result);
      this.mySource = result.sources;

    })
  }

  changeSource(newSource) {
    this.updateNews(newSource.target.value);
  }


}
