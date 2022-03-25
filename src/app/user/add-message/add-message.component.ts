import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/Post";
import {Message} from "../../models/Message";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  public messageEditForm: FormGroup;
  public isMessageCreated = false;
  public createdMessage: Message;

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private messageService: MessageService,
              private router: Router) {
  }

  initMessageForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.messageEditForm = this.initMessageForm();
  }

  submitMessageDate(): void {
    this.messageService.createMessage({
      title: this.messageEditForm.value.title,
      location: this.messageEditForm.value.location
    })
      .subscribe(messageData => {
        this.createdMessage = messageData;
        console.log(messageData);
      });
  }
}
