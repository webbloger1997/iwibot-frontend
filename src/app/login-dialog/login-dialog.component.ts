import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../shared/services/login.service';
import { ConversationService } from '../shared/services/conversation.service';
import { UserInformation } from '../shared/models/user-information';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  dialogTitle = 'Login';
  username: string;
  password: string;
  semester = '1';
  errorOccurred = false;
  errorText: string;
  lib_name: string;
  lib_pw: string;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginService: LoginService,
    private conversationService: ConversationService
  ) {
  }

  /**
   * Closes the Login dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  login(): void {
    this.loginService.getStudentInformation(this.username, this.password).subscribe(
      (data: any) => {
        const conversation = this.conversationService.getConversation();
        const userInformation = new UserInformation(this.semester, data.student.courseOfStudies);
        conversation.setUserInformation(userInformation);
        if(this.lib_name) {
          this.loginService.setLibCredentials(this.lib_name, this.lib_pw);

          this.loginService.verifyLibraryCredentials(this.lib_name, this.lib_pw).subscribe(
            (data: any) => {
              this.dialogRef.close();
            },
            error => {
              if (error.status === 401) {
                this.errorOccurred = true;
                this.errorText = 'Bibliotheks-Benutzername und/oder -Passwort falsch';
              }
            }
          );
        } else {
          this.dialogRef.close();
        }
      },
      error => {
        if (error.status === 401) {
          this.errorOccurred = true;
          this.errorText = 'Benutzername und/oder Passwort falsch';
        }
      }
    );

    


    
  }

  ngOnInit() {
  }

}
