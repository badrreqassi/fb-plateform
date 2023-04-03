import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../../models/User";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserCreateComponent} from "../user-create/user-create.component";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {UserService} from "../../services/user.service";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {SharingDataService} from "../../../services/sharing-data.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

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
  usersId!: number;

  constructor(private dialogService: DialogService,
              private userService: UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private sharingData: SharingDataService,) {
  }

  ngOnInit(): void {
    this.usersId = parseInt(localStorage.getItem('userId') as string);
    setTimeout(() => {
      this.sharingData.changeMenuItem([{id: '123456789', label: 'Home', routerLink: '/client/campaignsTesting'}, {label: 'List users'}] as MenuItem[])
    })
    this.getListUsers();
  }


  private getListUsers() {
    this.userService.getUsersList(this.first, this.rows, [{
      "field": "adminId",
      "value": this.usersId
    }]).subscribe(data => {
      this.users = data.searchValue;
      this.users = this.users.filter(el => el.id != this.usersId);
      this.totalRecords = data.searchCount
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

    this.getListUsers();
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

    this.getListUsers();
  }

  showChangePassword(user: User) {
    this.dialogRef = this.dialogService.open(ChangePasswordComponent, {
        width: '50%',
        showHeader: false,
        contentStyle: {"max-height": "900px", "overflow": "auto", "border-radius": "10px"},
        baseZIndex: 10000,
        dismissableMask: true,
        data: user
      }
    );

    this.getListUsers();
  }

  confirmDelete(user: User) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure that you want to delete this user?',
      dismissableMask: true,
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'delete-btn',
      accept: () => {
        console.log('delete', user)

        if (user?.id) {

          this.userService.deleteUser(user.id).subscribe((response) => {
            console.log('response');
          }, error => {

            if (error.toUpperCase() === 'OK') {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: 'User deleted successfully',
              })
              this.getListUsers();
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

  ngOnDestroy(): void {
    setTimeout(() => {
      this.sharingData.changeMenuItem([] as MenuItem[])
    })
  }
}
