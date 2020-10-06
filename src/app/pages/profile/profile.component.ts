import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/service/api.service';
import {User} from '../../models/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  myForm: FormGroup;
  selectedFile: File;
  profilePicture: any;
  retrieveResponse: any;
  base64Data: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {

    this.apiService.getUser().subscribe(data => {
      this.user = data;
      this.myForm = this.fb.group({
        username: this.user.username,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      });
      if (this.user.hasProfilePicture) {
        this.loadProfilePicture();
      }

    }, error => {
      window.alert(error);
    });
  }

  editProfile(inputFirstName: string, inputLastName: string, inputEmail: string): void {
    this.apiService.putEditProfile(inputFirstName, inputLastName, inputEmail).subscribe();
    location.reload();
  }

  uploadImage(): void {
    this.apiService.postUploadImage(this.selectedFile).subscribe();
    location.reload();
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  loadProfilePicture(): void {
    this.apiService.getDownloadImage().subscribe(res => {
      this.retrieveResponse = res;
      this.base64Data = this.retrieveResponse.picByte;
      this.profilePicture = 'data:image/jpeg;base64,' + this.base64Data;
    });
  }

  cancelEditing(): void {
    this.myForm = this.fb.group({
      username: this.user.username,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    });
  }

}
