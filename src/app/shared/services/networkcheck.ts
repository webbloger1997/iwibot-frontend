import { Injectable } from "@angular/core";
import { NewsbulletinboardService } from "./newsbulletinboard.service";

@Injectable({
    providedIn: 'root'
  })
  export class Networkcheck {
    private online = false;

    constructor(private newsBulletin: NewsbulletinboardService) {
        this.online = navigator.onLine;
        this.newsBulletin.getBulletinBoardNews().subscribe(
            (data) => {
                this.setOnline(true && navigator.onLine);
            },
            error => {
              this.setOnline(false && navigator.onLine);
            }
         );
    }

    public isOnline(): boolean {
        return this.online;
    }

    public setOnline(status: boolean) {
        this.online = status && navigator.onLine;
    }

  }