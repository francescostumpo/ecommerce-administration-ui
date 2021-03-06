import {Component, OnInit, ViewChild} from '@angular/core';
import {faPencilAlt, faTrashAlt, faPlusCircle, faMinusCircle, faEye} from '@fortawesome/free-solid-svg-icons';
import {Product} from '../../models/product';
import {Category} from '../../models/category';
import {SubCategoryService} from '../../services/sub-category.service';
import {SubCategory} from '../../models/sub-category';
import {ProductService} from '../../services/product.service';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag';
import {Variant} from '../../models/variant';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;
  isPanelAddVisible = false;
  isPanelRemoveVisible = false;
  isPanelAddTagVisible = false;
  isPanelRemoveTagVisible = false;
  faPencilAlt = faPencilAlt;
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  productList: Array<Product>;
  product: Product;
  productForUpdate: Product;
  subCategory: SubCategory;
  subCategoryList: Array<SubCategory>;
  tag: Tag;
  tagList: Array<Tag>;
  productTagList: Array<Tag>;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private subCategoryService: SubCategoryService, private tagsService: TagService, private productService: ProductService) {
    this.product = new Product();
    this.productForUpdate = new Product();
    this.subCategory = new SubCategory();
    this.tag = new Tag();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllSubCategories();
    this.getAllTags();
    this.dtOptions = {
      ordering: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }


  getAllTags(): void {
    this.tagsService.getAllTags().subscribe(res => {
      // @ts-ignore
      this.tagList = res.body;
      console.log('Available Tags: ', this.subCategoryList);
    });
  }

  getAllSubCategories(): void {
    this.subCategoryService.getAllSubCategories().subscribe(res => {
      // @ts-ignore
      this.subCategoryList = res.body;
      console.log('Available SubCategories: ', this.subCategoryList);
    });
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(res => {
      // @ts-ignore
      this.productList = res.body;
      this.dtTrigger.next();
      console.log('Available Products: ', this.subCategoryList);
    });
  }

  moveForUpdate(product: Product): void {
    this.productForUpdate = product;
    this.toggleCreateOrUpdatePanel('update');
  }

  toggleCreateOrUpdatePanel(action: string): void {
    if (action === 'update') {
      this.isPanelCreateVisible = false;
      this.isPanelRemoveVisible = false;
      this.isPanelAddVisible = false;
      this.isPanelRemoveTagVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
    } else {
      this.isPanelUpdateVisible = false;
      this.isPanelRemoveVisible = false;
      this.isPanelAddVisible = false;
      this.isPanelRemoveTagVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  toggleAddTagSubCategoryPanel(product: Product): void {
    this.productForUpdate = product;
    this.isPanelUpdateVisible = false;
    this.isPanelCreateVisible = false;
    this.isPanelRemoveVisible = false;
    this.isPanelRemoveTagVisible = false;
    /*this.subCategoryService.getAllSubCategories().subscribe(res => {
      // @ts-ignore
      this.subCategoryList = res.body;
      console.log('Available SubCategories: ', this.subCategoryList);
    });*/

    this.isPanelAddVisible = !this.isPanelAddVisible;
  }
  toggleRemoveTagPanel(product: Product): void {
    this.productForUpdate = product;
    this.isPanelUpdateVisible = false;
    this.isPanelCreateVisible = false;
    this.isPanelAddVisible = false;
    this.productTagList = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.tagList.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.productForUpdate.tags.length; j ++){
        if (this.productForUpdate.tags[j] === this.tagList[i]._id){
          this.productTagList.push(this.tagList[i]);
        }
      }
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.subCategoryList.length; i++) {
      if (this.productForUpdate.productSubCategoryId === this.subCategoryList[i]._id){
        this.subCategory = this.subCategoryList[i];
        console.log(this.subCategory);
        break;
      }
    }
    this.isPanelRemoveTagVisible = !this.isPanelRemoveTagVisible;
  }

  deleteTagfromProduct(tag: Tag): void {
    const request = {
      productId: this.productForUpdate._id,
      tagId: tag._id
    };

    this.productService.deleteTagFromProduct(request).subscribe(res => {
      this.rerender();
      // @ts-ignore
      alert(res.body.message);
      this.getAllProducts();
      this.isPanelRemoveTagVisible = false;
    });

  }

  checkAssignedTag(tag: Tag): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.productForUpdate.tags.length; i++){
      if (this.productForUpdate.tags[i] === tag._id){
        return true;
      }
    }
    return false;
  }

  deleteSubCategoryFromProduct(subCategory: SubCategory): void {
    const request = {
      productId: this.productForUpdate._id,
      subCategoryId: 'Uncategorized'
    };

    this.updateSubCategoryToProduct(request);
  }

  updateSubCategoryToProduct(request): void{
    this.productService.updateSubCategoryFromProduct(request).subscribe(res => {
      // @ts-ignore
      alert(res.body.message);
      this.rerender();
      this.getAllProducts();
      this.isPanelAddVisible = false;
      this.isPanelRemoveTagVisible = false;
    });
  }

  addTagToProduct(tag: Tag): void {
    const request = {
      productId: this.productForUpdate._id,
      tagId: tag._id
    };

    this.productService.addTagToProduct(request).subscribe(res => {
      this.rerender();
      // @ts-ignore
      alert(res.body.message);
      this.getAllProducts();
      this.isPanelAddVisible = false;
    });
  }

  addSubCategoryToProduct(subCategory: SubCategory): void {
    const request = {
      productId: this.productForUpdate._id,
      subCategoryId: subCategory._id
    };

    this.updateSubCategoryToProduct(request);
  }

  addRow(action: string): void {
    if (action === 'update') {
      this.productForUpdate.variants.push(new Variant());
    }else{
      this.product.variants = new Array<Variant>();
      this.product.variants.push(new Variant());
    }
  }

  createOrUpdateProduct(action: string): void {
    let product: Product;
    if (action === 'update') {
      product = this.productForUpdate;
    } else {
      product = this.product;
      product.tags = new Array<string>();
      product.productSubCategoryId = 'Uncategorized';
    }
    this.productService.createOrUpdateProduct(product).subscribe(res => {
      // @ts-ignore
      console.log('Response: ', res.body);
      this.toggleCreateOrUpdatePanel(action);
      // @ts-ignore
      this.category = {};
      // @ts-ignore
      alert(res.body.message);
      this.rerender();
      this.getAllProducts();
    }, error => {
      alert(error.message.message);
    });
  }

  deleteRow(variant: Variant): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.productForUpdate.variants.length; i++){
      if (variant.imageUrl === this.productForUpdate.variants[i].imageUrl){
        this.productForUpdate.variants.splice(i, 1);
        return;
      }
    }
  }
}
