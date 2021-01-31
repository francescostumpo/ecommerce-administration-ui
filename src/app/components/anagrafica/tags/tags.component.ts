import { Component, OnInit } from '@angular/core';
import {SubCategory} from '../../../models/sub-category';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {Tag} from '../../../models/tag';
import {TagService} from '../../../services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;
  faPencilAlt = faPencilAlt;

  tag: Tag;
  tagForUpdate: Tag;
  tagList: Array<Tag>;
  constructor(private tagService: TagService) {
    this.tag = new Tag();
    this.tagForUpdate = new Tag();
  }

  ngOnInit(): void {
    this.getAllTags();
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

  moveForUpdate(tag: Tag): void {
    this.tagForUpdate = tag;
    this.toggleCreateOrUpdatePanel('update');
  }

  createOrUpdateTag(action: string): void {
    let tag: Tag;
    if (action === 'update') {
      tag = this.tagForUpdate;
    } else {
      tag = this.tag;
    }
    this.tagService.createOrUpdateTag(tag).subscribe(res => {
      // @ts-ignore
      console.log('Response: ', res.body);
      // @ts-ignore
      alert(res.body.message);
      this.toggleCreateOrUpdatePanel(action);
      // @ts-ignore
      this.tag = {};
      this.getAllTags();
    }, error => {
      alert(error.message.message);
    });
  }

  getAllTags(): void {
    this.tagService.getAllTags().subscribe(res => {
      // @ts-ignore
      this.tagList = res.body;
      console.log('Available Tags: ', this.tagList);
    });
  }
}
