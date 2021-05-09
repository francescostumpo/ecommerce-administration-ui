import {Component, OnInit, ViewChild} from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {SubCategory} from '../../../models/sub-category';
import {SubCategoryService} from '../../../services/sub-category.service';
import {Category} from '../../../models/category';
import {SubCategoryOption} from '../../../models/sub-category-option';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;
  isPanelAddVisible = false;
  isPanelRemoveVisible = false;
  faPencilAlt = faPencilAlt;

  subCategory: SubCategory;
  subCategoryForUpdate: SubCategory;
  subCategoryList: Array<SubCategory>;
  subCategoryOption: SubCategoryOption;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  searchStatus: string;

  constructor(private subCategoryService: SubCategoryService) {
    this.subCategory = new SubCategory();
    this.subCategoryForUpdate = new SubCategory();
    this.subCategoryOption = new SubCategoryOption();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.dtOptions = {
      ordering: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getAllSubCategories();
  }

  getAllSubCategories(): void {
    this.subCategoryService.getAllSubCategories().subscribe(res => {
      // @ts-ignore
      this.subCategoryList = res.body;
      this.dtTrigger.next();
      console.log('Available SubCategories: ', this.subCategoryList);
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  moveForUpdate(subCategory: SubCategory): void {
    this.subCategoryForUpdate = subCategory;
    this.toggleCreateOrUpdatePanel('update');
  }

  toggleCreateOrUpdatePanel(action: string): void {
    if (action === 'update') {
      this.isPanelCreateVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
    } else {
      this.isPanelUpdateVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  createOrUpdateSubCategory(action: string): void {
    let subCategory: SubCategory;
    if (action === 'update') {
      subCategory = this.subCategoryForUpdate;
      console.log(subCategory);
    } else {
      subCategory = this.subCategory;
      subCategory.options = this.subCategoryOption;
    }
    this.subCategoryService.createOrUpdateSubCategory(subCategory).subscribe(res => {
      this.rerender();
      // @ts-ignore
      console.log('Response: ', res.body);
      // @ts-ignore
      alert(res.body.message);
      this.toggleCreateOrUpdatePanel(action);
      // @ts-ignore
      this.subCategory = {};
      this.getAllSubCategories();
    }, error => {
      alert(error.message.message);
    });
  }
}
