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
  isPostsLoaded = false;
  isMessagesLoaded = false;
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
        this.getVideosForPosts(this.posts);
        this.getCommentsForPosts(this.posts);
        this.isPostsLoaded = true;
      });

    this.messageService.getAllMessages()
      .subscribe(messageData => {
        console.log(messageData);
        this.messages = messageData;
        this.isMessagesLoaded = true;
      });
  }

  getImagesForPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.imageService.getPostImg(post.id!)
        .subscribe(imageData => {
          post.image = imageData.imageBytes;
        })
    });
  }

  getVideosForPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.videoService.getPostVideo(post.id!)
        .subscribe(videoData => {
          post.video = videoData.videoBytes;
        })
    });
  }

  getCommentsForPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.commentService.getCommentsForPost(post.id!)
        .subscribe(commentData => {
          post.comments = commentData;
        })
    });
  }


  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
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
          post.likedUsers?.push(this.user.username);
          this.notificationService.showSnackBar("Liked")
        });
    } else {
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








