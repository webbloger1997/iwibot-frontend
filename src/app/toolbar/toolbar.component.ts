import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';
import { ThemeManagerService } from '../shared/services/theme-manager.service';
import { ConversationService } from '../shared/services/conversation.service';
import { Networkcheck } from '../shared/services/networkcheck';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private themeManager: ThemeManagerService,
    private conversationService: ConversationService,
    private networkCheck: Networkcheck
  ) {
  }

  ngOnInit() {

  }

  online(): boolean {
    return this.networkCheck.isOnline();
  }

  /**
   * Toggle theme
   */
  toggleTheme() {
    this.themeManager.toggleTheme();
  }

  isDarkTheme(): boolean {
    return this.themeManager.darkTheme();
  }

  /**
   * Opens the login dialog
   */
  openDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '300px',
      data: {}
    });
  }

  deleteHistory(): void {
    this.conversationService.deleteHistory();
  }

}
