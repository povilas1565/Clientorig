import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {PostService} from "../../services/post.service";
import {MessageService} from "../../services/message.service";
import {NotificationService} from "../../services/notification.service";
import {ImageService} from "../../services/image.service";
import {UserService} from "../../services/user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {User} from "../../models/User";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  selectedFile!: File;
  userProfileImage!: File;
  previewImageUrl!: any;
  isUserDataLoaded = false;
  isMessagesDataLoaded = false;

  constructor(private tokenService: TokenStorageService,
              private dialog: MatDialog,
              private userService: UserService,
              private postService: PostService,
              private messageService: MessageService,
              private notificationService: NotificationService,
              private imageService: ImageService)
              {

  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(userData => {
        this.user = userData;
        this.isUserDataLoaded = true;
      });


    this.imageService.getUserProfileImg()
      .subscribe(userImg => {
        this.userProfileImage = userImg.imageBytes;
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImageUrl = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogEditUserProfileConfig = new MatDialogConfig();
    dialogEditUserProfileConfig.width = '1000px';
    dialogEditUserProfileConfig.data = {
      user: this.user
    }
    this.dialog.open(EditProfileComponent, dialogEditUserProfileConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }


  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageService.uploadImgToProfile(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Image updated successfully');
        });
    }
  }
}






