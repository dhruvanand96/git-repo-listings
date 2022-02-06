import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  HostListener,
} from '@angular/core';
import { MatSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';
import { LoadingService } from './services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  loading$ = this.loader.loading_$;
  constructor(
    public loader: LoadingService,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  @HostListener('click', ['$event.target'])
  handleKeyDown(event: KeyboardEvent) {
    this.snackBar.dismiss();
  }
  ngOnInit() {}

  // hook used to detect changes in view
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
