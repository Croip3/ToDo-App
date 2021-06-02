import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.page.html',
  styleUrls: ['./single-todo.page.scss'],
})
export class SingleTodoPage implements OnInit {
  public navParams = new NavParams();
  value: any;
  constructor(private navCtrl: NavController,) {
      this.value = this.navParams.get('title');
    }

  ngOnInit() {
    console.log(this.value);
  }

  goBack() {
    this.navCtrl.back();
  }

}
