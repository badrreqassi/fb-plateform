import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  private menuList = new BehaviorSubject<MenuItem[]>([]);
  items = this.menuList.asObservable()
  listItemMenuCopy: MenuItem[] = [];

  constructor() {
  }

  changeMenuItem(menuItems: MenuItem[]) {
    this.listItemMenuCopy = menuItems
    localStorage.setItem('menu', JSON.stringify(menuItems))
    this.menuList.next(menuItems);
  }

  getUsingItem(id: string): void {
     const result = this.listItemMenuCopy.find(el => el.id === id)
    this.listItemMenuCopy.splice(this.listItemMenuCopy.indexOf(result as MenuItem) + 1,
      (this.listItemMenuCopy.length - (this.listItemMenuCopy.indexOf(result as MenuItem) + 1)))
    this.changeMenuItem(this.listItemMenuCopy);

  }

}
