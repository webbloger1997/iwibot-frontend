import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class NewsbulletinboardService {

  bulletinBoardNewsUrl = ConfigService.getApiEndpoint('BULLETIN_BOARD_NEWS_URL');

  constructor(private http: HttpClient) { }

  /**
   *  Returns an array of news from the bulletin board.
   * @returns {Observable<NewsBulletinBoard[]>}
   */
  getBulletinBoardNews() {
    return this.http.get(this.bulletinBoardNewsUrl);
  }
}
