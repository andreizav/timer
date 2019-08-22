import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Time } from '../models/time.model';
import { ClockSettings } from '../models/clockSettings.Interface'

@Component({
  selector: 'list-item',
  template: `
    <div class="list">
        <div *ngFor="let time of listTime" class="item">
            <clock  [time]="time" [settings]="listClockSettings"></clock>
            <button (click)="remove.emit(time)">remove</button>
        </div>       
    </div>
  `,
  styleUrls: ['./listItem.cmp.css']
})
export class ListItemComponent {
  @Input() listTime: Time[];
  @Output() remove: EventEmitter<any> = new EventEmitter()
  listClockSettings: ClockSettings = {
    timeColor: "#fff",
    placeholderColor: "#454545"
  };
}

