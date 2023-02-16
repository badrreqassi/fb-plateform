import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../models/User";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserCreateComponent} from "../user-create/user-create.component";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {UserService} from "../../services/user.service";
import {ChangePasswordComponent} from "../change-password/change-password.component";

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

  selectedUser!: User;


  users: User[] = [];

  items = [
    {
      label: 'Edit user',
      icon: 'pi pi-pencil',
      command: (): void => {
        this.showEditDialog(this.selectedUser);
      },
    },
    {
      label: 'Change password',
      icon: 'pi pi-lock',
      command: (): void => {
        this.showChangePassword(this.selectedUser)
      },
    },
    {
      label: 'Delete user',
      icon: 'pi pi-trash',
      command: (): void => {
        this.confirmDelete(this.selectedUser);
      },
    }
  ] as MenuItem[];

  constructor(private dialogService: DialogService,
              private userService: UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userService.getUsersList(this.first, this.rows).subscribe(users => {
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

    this.dialogRef.onClose.subscribe(() => {
      this.userService.getUsersList(this.first, this.rows).subscribe(users => {
        this.users = users;
      })
    })
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

    this.dialogRef.onClose.subscribe(() => {
      this.userService.getUsersList(this.first, this.rows).subscribe(users => {
        this.users = users;
      })
    })
  }

  showChangePassword(user:User) {
    this.dialogRef = this.dialogService.open(ChangePasswordComponent, {
        width: '50%',
        showHeader: false,
        contentStyle: {"max-height": "900px", "overflow": "auto", "border-radius": "10px"},
        baseZIndex: 10000,
        dismissableMask: true,
        data: user
      }
    );

    this.dialogRef.onClose.subscribe(() => {
      this.userService.getUsersList(this.first, this.rows).subscribe(users => {
        this.users = users;
      })
    })
  }

  confirmDelete(user: User) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure that you want to delete this user?',
      dismissableMask: true,
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'delete-btn',
      accept: () => {
        if (user?.userId) {
          this.userService.deleteUser(user.userId).subscribe(() => {
          }, error => {
            if (error.status === 200) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: 'User deleted successfully',
              })
              this.userService.getUsersList(this.first, this.rows).subscribe(users => {
                this.users = users;
              })
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error while deleting User!',
              })
            }
          });
        }
      }
    });
  }

  onRowClick(data: User): void {
    this.selectedUser = data;
  }

}
