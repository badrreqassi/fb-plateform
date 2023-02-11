import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../models/User";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserCreateComponent} from "../user-create/user-create.component";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {ConfirmationService} from "primeng/api";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  totalRecords = 0;

  first = 0;

  rows = 10;

  rowPerPageOptions = [5, 10, 15, 20, 50, 100];

  dialogRef: DynamicDialogRef | undefined;


  users: User[] = [];

  constructor(private dialogService: DialogService,
              private userService: UserService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.userService.getUsersList().subscribe(users => {
      this.users = users;
    })
  }

  showCreationDialog() {
    this.dialogRef = this.dialogService.open(UserCreateComponent, {
        width: '50%',
        showHeader: false,
        contentStyle: {"max-height": "900px", "overflow": "auto", "border-radius": "10px"},
        baseZIndex: 10000,
        dismissableMask: true
      }
    );
  }

  showEditDialog(user: User) {
    this.dialogRef = this.dialogService.open(UserEditComponent, {
        width: '50%',
        showHeader: false,
        contentStyle: {"max-height": "900px", "overflow": "auto", "border-radius": "10px"},
        baseZIndex: 10000,
        dismissableMask: true,
        data: user
      }
    );
  }

  confirmDelete(user: User) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure that you want to delete this user?',
      dismissableMask: true,
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'delete-btn',
      accept: () => {
        // call delete
      }
    });
  }

}
