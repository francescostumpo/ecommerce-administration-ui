import { Component, OnInit } from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {SubCategory} from '../../../models/sub-category';
import {SubCategoryService} from '../../../services/sub-category.service';
import {Category} from '../../../models/category';
import {SubCategoryOption} from '../../../models/sub-category-option';

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

  constructor(private subCategoryService: SubCategoryService) {
    this.subCategory = new SubCategory();
    this.subCategoryForUpdate = new SubCategory();
    this.subCategoryOption = new SubCategoryOption();
  }

  ngOnInit(): void {
    this.getAllSubCategories();
  }

  getAllSubCategories(): void {
    this.subCategoryService.getAllSubCategories().subscribe(res => {
      // @ts-ignore
      this.subCategoryList = res.body;
      console.log('Available SubCategories: ', this.subCategoryList);
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
    } else {
      subCategory = this.subCategory;
      subCategory.options = this.subCategoryOption;
    }
    this.subCategoryService.createOrUpdateSubCategory(subCategory).subscribe(res => {
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
