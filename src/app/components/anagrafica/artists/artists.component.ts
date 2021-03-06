import { Component, OnInit } from '@angular/core';
import {Tag} from '../../../models/tag';
import {faPencilAlt, faTrashAlt, faPlusCircle, faMinusCircle, faEye} from '@fortawesome/free-solid-svg-icons';
import {TagService} from '../../../services/tag.service';
import {Artist} from '../../../models/artist';
import {ArtistService} from '../../../services/artist.service';
import {Category} from '../../../models/category';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;
  isPanelAddTagVisible = false;
  faPencilAlt = faPencilAlt;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faEye = faEye;

  tagName: string;
  artist: Artist;
  artistForUpdate: Artist;
  artistList: Array<Artist>;
  tagList: Array<Tag>;
  constructor(private artistService: ArtistService, private tagService: TagService) {
    this.artist = new Artist();
    this.artistForUpdate = new Artist();
  }

  ngOnInit(): void {
    this.getAllArtists();
    this.getAllTags();
  }

  getAllTags(): void {
    this.tagService.getAllTags().subscribe(res => {
      // @ts-ignore
      this.tagList = res.body;
      console.log('Available Tags: ', this.tagList);
    });
  }

  toggleCreateOrUpdatePanel(action: string): void {
    if (action === 'update') {
      this.isPanelCreateVisible = false;
      this.isPanelAddTagVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
    } else {
      this.isPanelUpdateVisible = false;
      this.isPanelAddTagVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  toggleAddTagPanel(artist: Artist): void {
    this.artistForUpdate = artist;
    this.isPanelUpdateVisible = false;
    this.isPanelCreateVisible = false;
    this.tagService.getAllTags().subscribe(res => {
      // @ts-ignore
      this.tagList = res.body;
      console.log('Available Tags: ', this.tagList);
    });
    this.isPanelAddTagVisible = true;
  }

  moveForUpdate(artist: Artist): void {
    this.artistForUpdate = artist;
    // tslint:disable-next-line:no-debugger
    debugger;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.tagList.length; i++){
      if (artist.tagId === this.tagList[i]._id){
        this.tagName = this.tagList[i].tagName;
        break;
      }
    }
    this.toggleCreateOrUpdatePanel('update');
  }

  createOrUpdateArtist(action: string): void {
    let artist: Artist;
    if (action === 'update') {
      artist = this.artistForUpdate;
    } else {
      artist = this.artist;
    }
    this.artistService.createOrUpdateArtist(artist).subscribe(res => {
      // @ts-ignore
      console.log('Response: ', res.body);
      // @ts-ignore
      alert(res.body.message);
      this.toggleCreateOrUpdatePanel(action);
      // @ts-ignore
      this.tag = {};
      this.getAllArtists();
    }, error => {
      alert(error.message.message);
    });
  }

  getAllArtists(): void {
    this.artistService.getAllArtists().subscribe(res => {
      // @ts-ignore
      this.artistList = res.body;
      console.log('Available Artists: ', this.artistList);
    });
  }

  // tslint:disable-next-line:typedef
  removeTagFromArtist(artist: Artist) {
    const tagToArtist = {
      artistId: artist._id
    };
    this.artistService.removeTagFromArtist(tagToArtist).subscribe(res => {
      // @ts-ignore
      alert(res.body.message);
      this.tagName = '';
      location.reload();
    });
  }

  // tslint:disable-next-line:typedef
  addTagToArtist(tag: Tag) {
    const tagToArtist = {
      artistId: this.artistForUpdate._id,
      tagId: tag._id
    };
    this.artistService.addTagToArtist(tagToArtist).subscribe(res => {
      // @ts-ignore
      alert(res.body.message);
      location.reload();
    });
  }
}
