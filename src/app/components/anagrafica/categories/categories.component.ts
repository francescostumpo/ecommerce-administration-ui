import { Component, OnInit } from '@angular/core';
import {faPencilAlt, faTrashAlt, faPlusCircle, faMinusCircle, faEye} from '@fortawesome/free-solid-svg-icons';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {SubCategory} from '../../../models/sub-category';
import {SubCategoryService} from '../../../services/sub-category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;
  isPanelAddVisible = false;
  isPanelRemoveVisible = false;
  faPencilAlt = faPencilAlt;
  faEye = faEye;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  categoryList: Array<Category>;
  category: Category;
  categoryForUpdate: Category;
  subCategoryList: Array<SubCategory>;

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService) {
    this.category = new Category();
    this.categoryForUpdate = new Category();
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  toggleCreateOrUpdatePanel(action: string): void {
    if (action === 'update') {
      this.isPanelCreateVisible = false;
      this.isPanelRemoveVisible = false;
      this.isPanelAddVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
    } else {
      this.isPanelUpdateVisible = false;
      this.isPanelRemoveVisible = false;
      this.isPanelAddVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  toggleAddSubCategoryPanel(category: Category): void {
    this.categoryForUpdate = category;
    this.isPanelUpdateVisible = false;
    this.isPanelCreateVisible = false;
    this.isPanelRemoveVisible = false;
    this.isPanelAddVisible = !this.isPanelAddVisible;
    this.subCategoryService.getAllSubCategories().subscribe(res => {
      // @ts-ignore
      this.subCategoryList = res.body;
      console.log('Available SubCategories: ', this.subCategoryList);
    });
  }

  toggleRemoveSubCategoryPanel(category: Category): void {
    this.categoryForUpdate = category;
    this.isPanelUpdateVisible = false;
    this.isPanelCreateVisible = false;
    this.isPanelAddVisible = false;
    this.subCategoryList = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.categoryForUpdate.subCategories.length; i++) {
      this.subCategoryService.getSubCategory(this.categoryForUpdate.subCategories[i]).subscribe(res => {
          // @ts-ignore
        this.subCategoryList.push(res.body);
        console.log(this.subCategoryList);
      });
    }
    this.isPanelRemoveVisible = !this.isPanelRemoveVisible;
  }

  moveForUpdate(category: Category): void {
    this.categoryForUpdate = category;
    this.toggleCreateOrUpdatePanel('update');
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(res => {
      // @ts-ignore
      this.categoryList = res.body;
      console.log('Available Categories: ', this.categoryList);
    });
  }

  createOrUpdateCategory(action: string): void {
    let category: Category;
    if (action === 'update') {
      category = this.categoryForUpdate;
    } else {
      category = this.category;
    }
    this.categoryService.createOrUpdateCategory(category).subscribe(res => {
      // @ts-ignore
      console.log('Response: ', res.body);
      this.toggleCreateOrUpdatePanel(action);
      // @ts-ignore
      this.category = {};
      // @ts-ignore
      alert(res.body.message);
      this.getAllCategories();
    }, error => {
      alert(error.message.message);
    });
  }

  addSubCategoryToCategory(subCategory: SubCategory): void {
    // tslint:disable-next-line:no-debugger
    debugger;
    const request = {
      categoryId: this.categoryForUpdate._id,
      subCategoryId: subCategory._id
    };

    this.categoryService.addSubCategoryToCategory(request).subscribe(res => {
      // @ts-ignore
      alert(res.body.message);
      this.getAllCategories();
      this.isPanelAddVisible = false;
    });
  }

 deleteSubCategoryFromCategory(subCategory: SubCategory): void {
    const request = {
      categoryId: this.categoryForUpdate._id,
      subCategoryId: subCategory._id
    };

    this.categoryService.deleteSubCategoryFromCategory(request).subscribe(res => {
      // @ts-ignore
      alert(res.body.message);
      this.getAllCategories();
      this.isPanelRemoveVisible = false;
    });
  }
}
