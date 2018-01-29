import { Component, OnInit } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'app-hammer-demo',
  templateUrl: './hammer-demo.component.html',
  styleUrls: ['./hammer-demo.component.css'],
})
export class HammerDemoComponent implements OnInit {

  // constant for swipe action: left or right
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  // our list of avatars
  avatars = [
    {
      name: 'kristy',
      image: 'assets/img/hammer-demo/kristy.png',
      visible: true,
    },
    {
      name: 'matthew',
      image: 'assets/img/hammer-demo/matthew.png',
      visible: false,
    },
    {
      name: 'chris',
      image: 'assets/img/hammer-demo/chris.jpg',
      visible: false,
    },
    {
      name: 'jenny',
      image: 'assets/img/hammer-demo/jenny.jpg',
      visible: false,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  // action triggered when user swipes
  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
      // out of range
      if (currentIndex > this.avatars.length || currentIndex < 0) {
        return;
      }
      let nextIndex = 0;

      // swipe right, next avatar
      if (action === this.SWIPE_ACTION.RIGHT) {
          const isLast = currentIndex === this.avatars.length - 1;
          nextIndex = isLast ? 0 : currentIndex + 1;
      }

      // swipe left, previous avatar
      if (action === this.SWIPE_ACTION.LEFT) {
          const isFirst = currentIndex === 0;
          nextIndex = isFirst ? this.avatars.length - 1 : currentIndex - 1;
      }

      // toggle avatar visibility
      this.avatars.forEach((x, i) => x.visible = (i === nextIndex));
  }

}
