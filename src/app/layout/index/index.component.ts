import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {Post} from "../../models/Post";
import {Message} from "../../models/Message";
import {UserService} from "../../services/user.service";
import {PostService} from "../../services/post.service";
import {MessageService} from "../../services/message.service";
import {CommentService} from "../../services/comment.service";
import {VideoService} from "../../services/video.service";
import {ImageService} from "../../services/image.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  user!: User;
  posts!: Post[];
  messages!: Message[];
  isPostLoaded = false;
  isMessageLoaded = false;
  isUserDataLoaded = false;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private imageService: ImageService,
    private videoService: VideoService,
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(userData => {
        console.log(userData);
        this.user = userData;
        this.isUserDataLoaded = true;
      });

    this.postService.getAllPosts()
      .subscribe(postData => {
        console.log(postData);
        this.posts = postData;
        this.getImagesForPosts(this.posts);
        this.getVideoForPosts(this.posts);
        this.getCommentForPosts(this.posts);
        this.isPostLoaded = true;
      });

    this.messageService.getAllMessages()
      .subscribe(messageData => {
        console.log(messageData);
        this.messages = messageData;
        this.getImagesForMessages(this.messages);
        this.isMessageLoaded = true;
      });
  }

  getImagesForPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.imageService.getPostImage(post.id!)
        .subscribe(imageData => {
          post.image = imageData.imageBytes;
        })
    });
  }

  getVideoForPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.videoService.getPostVideo(post.id!)
        .subscribe(videoData => {
          post.video = videoData.videoBytes;
        })
    });
  }

  getCommentForPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.commentService.getCommentForPost(post.id!)
        .subscribe(commentData => {
          post.comments = commentData;
        })
    });
  }

  getImagesForMessages(messages: Message[]): void {
    messages.forEach(message => {
      this.imageService.getMessageImage(message.id!)
        .subscribe(imageData => {
          message.image = imageData.imagebytes;
        })
    });
  }

  formatImage(image: any): any {
    if (image == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + image;
  }

  formatVideo(video: any): any {
    if (video == null) {
      return null;
    }
    return 'data:video/avi;mp4,' + video;
  }

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);

    if (!post.likedUsers?.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          const index = post.likedUsers?.indexOf(this.user.username, 0);
          if (index! > -1) {
            post.likedUsers?.splice(index!, 1);
            this.notificationService.showSnackBar("Disliked")
          }
        });
    }
  }

  postComment(message: string, postId: number, postIndex: number): void {
    if (message.trim() !== '') {
      const post = this.posts[postIndex];
      console.log(post);
      this.commentService.addCommentToPost(postId, message)
        .subscribe(commentData => {
          console.log(commentData);
          post.comments?.push(commentData);
        });
    }
  }

  checkLike(username: string, postIndex: number): boolean {
    const post = this.posts[postIndex];
    const index = post.likedUsers?.indexOf(username, 0);
    if (index! > -1) {
      return true;
    }
    return false;
  }
}








