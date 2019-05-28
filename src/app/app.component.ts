import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { switchMapTo, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hdm-demo';

  constructor(private swUpdate: SwUpdate, private applicationRef: ApplicationRef) { }

  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.applicationRef.isStable.pipe(
        take(1),
        switchMapTo(this.swUpdate.available)
      ).subscribe((evt) => {
        console.log('service worker updated');
      });

      this.swUpdate.checkForUpdate().then(() => {
        // noop
      }).catch((err) => {
        console.error('error when checking for update', err);
      });
    }
  }
}
