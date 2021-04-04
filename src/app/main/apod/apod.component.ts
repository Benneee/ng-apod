import { Apod, ApodService } from './../../services/apod.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.scss'],
})
export class ApodComponent implements OnInit {
  apodsList: Apod[] = [];

  startDate: any = null;
  endDate: any = null;
  isLoading = false;
  constructor(
    private apodService: ApodService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getApods();
  }

  getApods() {
    this.isLoading = true;
    const apods$ = this.apodService.getApodsList();
    apods$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.apodsList = res;
          }
        },
        (error) => console.log('error: ', error)
      );
  }

  // tslint:disable-next-line: typedef
  getStartDate(e: any) {
    this.startDate = e.target.value;
  }

  // tslint:disable-next-line: typedef
  getEndDate(e: any) {
    this.endDate = e.target.value;
    if (this.startDate === null) {
      this.toastr.warning('Kindly select a start date');
    } else {
      this.runFilterByDateRange(this.startDate, this.endDate);
    }
  }

  // tslint:disable-next-line: typedef
  runFilterByDateRange(start: string, end: string) {
    this.isLoading = true;
    const apodsByDateRange$ = this.apodService.getApodsByDateRange(start, end);
    apodsByDateRange$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.apodsList = res;
          }
        },
        (error) => {
          this.toastr.error(error.statusText);
          console.log('error: ', error);
        }
      );
  }
}
