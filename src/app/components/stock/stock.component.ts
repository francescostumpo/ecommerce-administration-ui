import { Component, OnInit } from '@angular/core';
import {SubCategoryService} from '../../services/sub-category.service';
import {SubCategory} from '../../models/sub-category';
import {SubCategoryOption} from '../../models/sub-category-option';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {StockService} from '../../services/stock.service';
import {Stock} from '../../models/stock';
import {StockVariant} from '../../models/stock-variant';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;
  isPanelAddVisible = false;
  isPanelRemoveVisible = false;
  faPencilAlt = faPencilAlt;

  subCategory: SubCategory;
  subCategoryForUpdate: SubCategory;
  subCategoryList: Array<SubCategory>;
  stock: Stock;
  subCategoryOption: SubCategoryOption;

  constructor(private subCategoryService: SubCategoryService, private stockService: StockService) {
    this.stock = new Stock();
    this.subCategory = new SubCategory();
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

  // tslint:disable-next-line:typedef
  moveForUpdate(subCategory: SubCategory){
    this.stockService.getStockBySubCategoryId(subCategory._id).subscribe(res => {
      // @ts-ignore
      if (res.body.message != null && (res.body.message.includes('Nessun') || res.body.message.includes('Errore'))) {
        this.stock = new Stock();
      }else{
        // @ts-ignore
        this.stock = res.body;
      }
      console.log('Stock: ', this.stock);
    });
    this.subCategoryService.getSubCategory(subCategory._id).subscribe(resSub => {
      // @ts-ignore
      this.subCategory = resSub.body;
      this.isPanelUpdateVisible = true;
      console.log('SubCategory: ', this.subCategory);
    });
  }

  // tslint:disable-next-line:typedef
  addStockVariant() {
    const newVariant = new StockVariant();
    if (this.stock.stockVariants === undefined){
      const stockVariants: Array<StockVariant> = new Array<StockVariant>();
      this.stock.productSubCategoryId = this.subCategory._id;
      this.stock.stockVariants = stockVariants;
    }
    this.stock.stockVariants.push(newVariant);
  }

  // tslint:disable-next-line:typedef
  createOrUpdateStock(stock: Stock){
    this.stockService.createOrUpdateStock(stock).subscribe(res => {
      console.log('Response: ', res.body);
      // @ts-ignore
      alert(res.body.message);
      this.isPanelUpdateVisible = false;
    });
  }
}
