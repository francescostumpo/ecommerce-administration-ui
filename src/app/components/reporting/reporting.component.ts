import { Component, OnInit } from '@angular/core';
import {ReportingService} from '../../services/reporting.service';
import {DownloadService} from '../../services/download.service';
import {DateFormatterService} from '../../services/utils/dateformatter.service';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  dataDA: Date;
  dataA: Date;
  areDatesTSNotPresent = true;
  tagList: Array<Tag>;
  tagId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private reportingService: ReportingService, private downloadService: DownloadService, private dateFormatterService: DateFormatterService, private tagService: TagService, private authService: AuthService){
    this.tagList = new Array<Tag>();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.checkDates();
    this.getAllTags();
  }

  getAllTags(): void {
    this.tagService.getAllTags().subscribe(res => {
      // @ts-ignore
      const possibleTags: Array<Tag> = res.body;
      const preferredUserame = this.authService.getPreferredUserame();
      const role = this.authService.getRoles();
      if (role.indexOf('Amministratore') > -1) {
        // @ts-ignore
        this.tagList = res.body;
      }else{
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < possibleTags.length; i++){
          if (possibleTags[i].userId === preferredUserame){
            this.tagList.push(possibleTags[i]);
          }
        }
      }
      console.log('Available Tags: ', this.tagList);
    });
  }

  downloadReport(): void {
    let dateDa: Date;
    let dateA: Date;
    dateDa = this.dataDA;
    dateA = this.dataA;
    console.log(dateDa, dateA);
    this.reportingService.downloadReport(dateDa, dateA, this.tagId).subscribe(res => {
      console.log(res);
      // tslint:disable-next-line:max-line-length
      this.downloadService.downloadFile(res, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'report_' + this.dateFormatterService.formateDateD(new Date()) + '.xlsx');
    }, error => {
      alert(error.message);
    });
  }

  checkDates(): void {
    if (this.dataDA !== undefined && this.dataA !== undefined) {
      this.areDatesTSNotPresent = false;
    }
  }
}
