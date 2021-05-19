import {Component, OnInit, ViewChild} from '@angular/core';
import {faPencilAlt, faEye, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Faq} from '../../models/faq';
import {FaqService} from '../../services/faq.service';
import {SubParagraph} from '../../models/subParagraph';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})

export class FaqComponent implements OnInit {
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faEye = faEye;
  faPlus = faPlus;

  faq: Faq;
  faqForUpdate: Faq;
  faqsList: Faq[];
  clearSubParagraphList: SubParagraph[] = [];

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private faqService: FaqService) {
    this.faq = new Faq();
    this.faqForUpdate = new Faq();
  }

  ngOnInit(): void {
    this.faq.subParagraphs = [];
    window.scrollTo(0, 0);
    this.getAllFaqs();
    this.dtOptions = {
      ordering: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  toggleCreateOrUpdatePanel(action: string): void {
    if (action === 'update') {
      this.isPanelCreateVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
      if (!this.isPanelUpdateVisible) {
        this.toggleCreateOrUpdatePanel('update');
      }
    } else {
      this.isPanelUpdateVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  moveForUpdate(faq: Faq): void {
    this.faqForUpdate = faq;
    this.faqForUpdate = this.replaceListChar('<br>', '\n', this.faqForUpdate);
    // tslint:disable-next-line:no-debugger
    // debugger;
    // tslint:disable-next-line:prefer-for-of-
    this.toggleCreateOrUpdatePanel('update');
  }

  createOrUpdateFaq(action: string): void {
    let faq: Faq;
    if (action === 'update') {
      faq = this.faqForUpdate;
      console.log('FAQ: ' + faq);
    } else {
      faq = this.faq;
      faq.position = (this.faqsList.length + 1).toString();
    }
    faq = this.replaceListChar('\n', '<br>', faq);

    this.faqService.createOrUpdateFaq(faq).subscribe(res => {
      this.rerender();
      // @ts-ignore
      alert(res.body.message);
      this.toggleCreateOrUpdatePanel(action);
      this.getAllFaqs();
    }, error => {
      alert(error.message.message);
    });
  }

  getAllFaqs(): void {
    this.faqService.getAllFaqs().subscribe(res => {
      // @ts-ignore
      this.faqsList = res.body;
      this.dtTrigger.next();

    });

  }
  deleteFaq(faq: Faq): void{
    this.faqService.deleteFaq(faq).subscribe(res => {
      if (res.ok){
        this.rerender();
        alert('FAQ eliminato correttamente');
        this.getAllFaqs();
      }else{
        alert('FAQ non eliminato');
      }
    });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
  removeFaqSub(id: number, action: string): void{

    if (action === 'update'){
      for (let i = 0; i < this.faqForUpdate.subParagraphs.length; i++){
        if (i !== id) {
          this.clearSubParagraphList.push(this.faqForUpdate.subParagraphs[i]);
        }
      }
      this.faqForUpdate.subParagraphs = this.clearSubParagraphList;
    }else{
      for (let i = 0; i < this.faq.subParagraphs.length; i++){
        if (i !== id) {
          this.clearSubParagraphList.push(this.faq.subParagraphs[i]);
        }
      }
      this.faq.subParagraphs = this.clearSubParagraphList;
    }
    this.clearSubParagraphList = [];
  }
  addFaqSub(action: string): void{
    if (this.faqForUpdate.subParagraphs === null){
      this.faqForUpdate.subParagraphs = [];
    }
    if (action === 'update'){
      this.faqForUpdate.subParagraphs.push(new SubParagraph());
    }else{
      this.faq.subParagraphs.push(new SubParagraph());
    }
  }
  getSubBodyLength(id: number, subParagraph: SubParagraph): number{
    let ln: number;
    if (subParagraph.body !== undefined){
      ln = subParagraph.body.length / 35;
    }else{
      ln = 10;
    }
    return ln;
  }

  replaceListChar(find: string, replace: string, faq: Faq): Faq{
    while (faq.answer.includes(find)){
      faq.answer = faq.answer.replace(find, replace);
    }
    if (faq.subParagraphs !== null) {
      for (const sub of faq.subParagraphs) {
        while (sub.body.includes(find)) {
          sub.body = sub.body.replace(find, replace);
        }
      }
    }
    return faq;
  }
}
