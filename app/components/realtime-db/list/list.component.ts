import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from "@angular/forms";

// Firebase
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

// RxJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Services
import { RealtimeDbService } from "../realtime-db.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  editItemForm: FormGroup;
  isEditVisible = false;
  actualItem: any;

  constructor(
    private afDb: AngularFireDatabase,
    private fb: FormBuilder,
    private rds: RealtimeDbService
  ) {
    this.itemsRef = this.afDb.list('AngularAvanguard');
    // Use snapshotChanges().map() to store the key and rerun when chnages are detected
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      console.log(changes);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
   // this.items = this.itemsRef.valueChanges();
    this.rds.updateList();

    // Edit Form
    this.editItemForm = this.fb.group(
      {
        title: ['', Validators.required],
        location: ['', Validators.required],
        details: ['', Validators.required],
        link: ['', Validators.required],
        image: ['', Validators.required]
      }
    )
  }

  ngOnInit() {
  }

  goToLink(link) {
    console.log(link);
    // window.location.href = link;
    window.open(link, '_blank'); // opens in a new tab
  }

  toggleEditItemForm() {
      this.isEditVisible = !this.isEditVisible;
  }

  grabItem(item) {
      this.actualItem = item;
  }

  pushItemToList(title: string, location: string, details: string, url: string, image: string) {
      let key = title.slice(title.lastIndexOf(" ") + 1);
      // For key I take the last part of fullname, for example if name='Van der Groning' the key='Groning'
      this.itemsRef.set(key,
          {
              title: title,
              location: location,
              text: details,
              link: url,
              poster: image
          }
    )
      .then(_ => console.log('New Item Added Successfully'))
    // .catch(err => console.log(err, 'You do not have access to Push!'));
  }

  setSingleItem( title: string, location: string, details: string, url: string, image: string) {
      let key = title.slice(title.lastIndexOf(" ") + 1);
      this.toggleEditItemForm();
      this.itemsRef.set(key,
          {
              title: title,
              location: location,
              text: details,
              link: url,
              poster: image
          })
      .then(_ => console.log('Single Item Set Successfully'))
      .catch(err => console.log(err, 'You do not have access to Set!'));
  }

  

  removeSingleItemFromList(itemKey: string) {
    this.itemsRef.remove(itemKey)
      .then(_ => console.log('Single Item Removed Successfully'))
      .catch(err => console.log(err, 'You do not have access to Remove!'));
  }

  removeAllItems() {
    this.itemsRef.remove()
      .then(_ => console.log('All Items Removed Successfully'))
      .catch(err => console.log(err, 'You do not have access to Remove!'));
  }

}
