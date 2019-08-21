import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Time } from '../models/time.model';
import { ClockSettings } from '../models/clockSettings.Interface'

@Component({
  selector: 'clock',
  template: `
    <div class="clock">
    <!-- HOUR -->
    <div class="numbers">
        <p class="hours" [ngStyle]="{'color':settings.timeColor}">{{time.hour}}</p>
        <p class="placeholder" [ngStyle]="{'color':settings.placeholderColor}">88</p>
    </div>

    <div class="colon" [ngStyle]="{'color':settings.timeColor}">
        <p>:</p>
    </div>

    <!-- MINUTE -->
    <div class="numbers">
        <p class="minutes" [ngStyle]="{'color':settings.timeColor}">{{time.minute}}</p>
        <p class="placeholder" [ngStyle]="{'color':settings.placeholderColor}">88</p>
    </div>

    <div class="colon" [ngStyle]="{'color':settings.timeColor}">
        <p>.</p>
    </div>

    <!-- SECOND -->
    <div class="numbers">
        <p class="seconds" [ngStyle]="{'color':settings.timeColor}">{{time.sec}}</p>
        <p class="placeholder" [ngStyle]="{'color':settings.placeholderColor}">88</p>
    </div>

    </div><!-- END CLOCK -->
  `,
  styleUrls: ['./clock.cmp.css']
})
export class ClockComponent {
    @Input() time: Time;
    @Input() settings: ClockSettings;
}

