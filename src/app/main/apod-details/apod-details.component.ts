import { finalize } from 'rxjs/operators';
import { Apod, ApodService } from './../../services/apod.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-apod-details',
  templateUrl: './apod-details.component.html',
  styleUrls: ['./apod-details.component.scss'],
})
export class ApodDetailsComponent implements OnInit {
  isLoading = false;
  apodDate: string;
  apodDetails: Apod = null;
  constructor(
    private apodService: ApodService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getApodDateAndLoadDetails();
  }

  // tslint:disable-next-line: typedef
  getApodDateAndLoadDetails() {
    this.route.params.subscribe((p: Params) => {
      if (!p['date']) {
        return;
      } else {
        this.apodDate = p['date'];
        this.loadApodDetails(this.apodDate);
      }
    });
  }

  // tslint:disable-next-line: typedef
  loadApodDetails(date: string) {
    this.isLoading = true;
    const apodDetails$ = this.apodService.getApodDetail(date);
    apodDetails$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.apodDetails = res;
            console.log('details: ', this.apodDetails);
          }
        },
        (error) => console.log('error: ', error)
      );
  }
}
