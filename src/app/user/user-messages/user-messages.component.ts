import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/Message";

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {
  messages: Message[];
  isMessagesLoaded: boolean;

  constructor(private messageService: MessageService,
              private notificationService: NotificationService) {
  }

  deleteMessage(message: Message, index: number): void {
    console.log(message);
    const result = confirm ('Do you want remove this post?');
    if (result) {
      this.messageService.deleteMessage(message.id)
        .subscribe(() => {
          this.messages.slice(index, 1);
          this.notificationService.showSnackBar('Message has been deleted');
        });
    }
  }

  ngOnInit(): void {
    this.messageService.getMessagesForCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.messages = data;
        this.isMessagesLoaded = true;
      });
  }
  }


