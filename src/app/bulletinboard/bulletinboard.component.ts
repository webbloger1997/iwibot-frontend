import { Component, OnInit } from '@angular/core';
import { NewsbulletinboardService } from '../shared/services/newsbulletinboard.service';
import { NewsBulletinBoard } from '../shared/models/news-bulletin-board';
import { Networkcheck } from '../shared/services/networkcheck';

@Component({
  selector: 'app-bulletinboard',
  templateUrl: './bulletinboard.component.html',
  styleUrls: ['./bulletinboard.component.css']
})
export class BulletinboardComponent implements OnInit {
  newsList: NewsBulletinBoard[];
  private key = 'bulletinBoardNews';

  constructor(private newsBulletin: NewsbulletinboardService, private networkCheck: Networkcheck) {
    this.newsList = [];
    this.newsBulletin.getBulletinBoardNews().subscribe(
      (news: NewsBulletinBoard[]) => {
        this.newsList = news;
        localStorage.setItem(this.key, JSON.stringify(news));
        networkCheck.setOnline(true);
      },
      error => {
        networkCheck.setOnline(false);
      }
      );
  }
  ngOnInit() {
    if (this.newsList.length === 0) {
      if (window.localStorage) {
        const news = localStorage.getItem(this.key);
        if (news) {
          try {
            this.newsList = JSON.parse(news);
          } catch (err) {
            localStorage.removeItem(this.key);
          }
        }
      }
    }
  }

}
