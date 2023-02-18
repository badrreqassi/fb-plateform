import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-empty',
  templateUrl: './content-empty.component.html',
  styleUrls: ['./content-empty.component.scss']
})
export class ContentEmptyComponent implements OnInit {
  @Input() icon = 'pi pi-video'
  @Input() message = 'Aucune vidéo importée'
  @Input()  valid = true;
  @Input() height = '130'

  constructor() {
  }

  ngOnInit(): void {
  }

}
