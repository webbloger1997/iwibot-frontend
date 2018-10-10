import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conversation } from '../models/conversation';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/message';
import { LoginService } from './login.service';
import { ConversationResponseObject } from '../models/conversation-response-object';
import {ConfigService} from './config.service';
import { ConversationRequestObject } from '../models/conversation-request-object';

@Injectable()
export class ConversationService {

  private CONVERSATION_API_URL = ConfigService.getApiEndpoint('CONVERSATION_API_URL');
  private readonly newMessagesSubject: Subject<Message>;

  constructor(
    private http: HttpClient,
    private conversation: Conversation,
    private loginService: LoginService,
  ) {
    this.newMessagesSubject = new Subject();
    this.initConversation();
  }

  /**
   * Initializes the conversation
   *
   * initial request to the conversation service to set the context of the conversation
   * and get the first message
   * @returns void
   */
  private initConversation(): void {
    const initObject: any = {};
    initObject.conInit = true;
    this.sendMessageToConversationService(initObject)
      .subscribe(
        (response: ConversationResponseObject) => {
          const message = new Message(response.payload, false);
          this.conversation.addMessage(message);
          this.conversation.setContext(response.context);
        }
      );
  }

  /**
   * Sends a request with the message to the conversation service and processes the response
   * @param {string} message
   */
  public sendMessage(message: string) {
    const sendMessage = new Message(message, true);
    this.addMessageToConversation(sendMessage);

    const request: ConversationRequestObject = this.createConversationRequestObject(message);
    this.sendMessageToConversationService(request).subscribe((response: ConversationResponseObject) => {
      this.processConversationResponse(response);
    });
  }

  /**
   * Creates a request object with information from the message and the conversation.
   * @params (string) message  the message that gets send with the request
   * @returns {any}
   */
  private createConversationRequestObject(message: string): ConversationRequestObject {
    const requestObject: ConversationRequestObject = {
        payload : message,
        context : this.conversation.getContext()
    };
    requestObject.context.iwibotCreds = this.loginService.getCookie('iwibot-creds');
    if (this.getConversation().getUserInformation()) {
      requestObject.semester = this.conversation.getUserInformation().getSemester();
      requestObject.courseOfStudies = this.conversation.getUserInformation().getCourseOfStudies();
    }
    return requestObject;
  }

  /**
   * Processes the response from the conversation service
   *
   * creates a news  message, sets the new context and adds the message
   * to the conversation.
   * @param (conversationResponseObject) conversationResponseObject
   */
  private processConversationResponse(conversationResponseObject: ConversationResponseObject): void {
    const responseMessage = new Message(
                            conversationResponseObject.payload,
                            false,
                            conversationResponseObject.htmlText,
                            conversationResponseObject.language
                            );
    this.conversation.setContext(conversationResponseObject.context);
    this.addMessageToConversation(responseMessage);
  }

  /**
   * Sends a request to the conversation service
   * @param {Object} requestObject
   * @returns {Observable<ConversationResponseObject>}
   */
  private sendMessageToConversationService(requestObject: Object): Observable<ConversationResponseObject> {
    return this.http.post<ConversationResponseObject>(this.CONVERSATION_API_URL, requestObject);
  }

  /**
   * Adds a message to the conversation and emits the message under the newMessageSubject
   * @param {Message} message   the message that gets added to the conversation
   */
  private addMessageToConversation(message: Message): void {
    this.conversation.addMessage(message);
    this.newMessagesSubject.next(message);
  }

  /**
   * Returns the current conversation
   * @returns {Conversation}
   */
  public getConversation(): Conversation {
    return this.conversation;
  }

  /**
   * Returns the messages from the conversation
   * @returns {Message[]}
   */
  public getConversationMessages(): Message[] {
    return this.conversation.getMessages();
  }

  /**
   * Returns the newMessageSubject
   * @returns {Subject<Message[]>}
   */
  public getNewMessageSubject(): Subject<Message> {
    return this.newMessagesSubject;
  }
}
