import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class RealtimeDbService {

  itemsRef: AngularFireList<any>;

  constructor(
    private afDb: AngularFireDatabase
  ) {
      this.itemsRef = this.afDb.list('AngularAvanguard');
  }

  updateList() {
    this.itemsRef.update('/',
      {
          Seguin: {
          title: 'Andrew Seguin',
          location: 'California',
          text: 'Andrew is an engineer on the Angular Material team working on bringing material components to the world. When he’s not obsessing over pixels and design, he is probably off somewhere having adventures with his wife and daughters.',
          poster: 'https://avatars2.githubusercontent.com/u/22898577?s=460&v=4',
          link: 'https://github.com/andrewseguin'
        },
          Bell: {
          title: 'Ward Bell',
          location: 'California',
          text: `Ward is an all-around developer with JavaScript, node, and .net
chops. He's a frequent conference speaker and podcaster, trainer, Google Developer
Expert for Angular, Microsoft MVP, and PluralSight author. He is also president of
IdeaBlade, an enterprise software consulting firm and the makers of breeze.js.He
would like to get more sleep and spend more time in the mountains.`,
          poster: 'https://avatars1.githubusercontent.com/u/129061?s=460&v=4',
          link: 'https://github.com/wardbell'
        },
          Black: {
          title: 'Naomi Black',
          location: 'New-York',
          text: `Naomi is Angular's TPM generalist and jack-of-all-trades. She
supports Angular's internal Google users and solves hard-to-define problems. She's
been at Google since 2006, as a technical program manager on projects ranging from
Accessibility to Google Transit. She fights daleks in her spare time.`,
          poster: 'http://olliesk8.github.io/angular-team/img/person/naomi.jpg',
          link: 'https://plus.google.com/+NaomiBlack'
        },
          Silva: {
          title: 'Filipe Silva',
          location: 'Dublin',
          text: `Filipe is a passion-driven developer that always strives for the
most elegant solution for each problem. He is currently an author for Angular.io,
a core contributor for Angular-CLI and senior front end engineer at KonnectAgain.
When not busy going through PRs, you can find him scouring reddit for new dinner
recipes to cook or enjoying a craft beer in Dublin.`,
          poster: 'https://avatars3.githubusercontent.com/u/4172079?s=460&v=4',
          link: 'http://github.com/filipesilva'
      }
      }
    )
      .then(_ => console.log('List Reinitialized Successfully'))
      .catch(err => console.log(err, 'You do not have access!'));
  }

}
