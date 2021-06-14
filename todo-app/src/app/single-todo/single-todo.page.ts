import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.page.html',
  styleUrls: ['./single-todo.page.scss'],
})
export class SingleTodoPage implements OnInit {

  title: any;
  progress: any;
  color: any;

  constructor(private navCtrl: NavController,private route: ActivatedRoute, private router: Router) {
      this.route.queryParams.subscribe(params => {
        if (params && params.title){
          this.title = params.title;
        }
        if (params && params.progress){
          this.progress = params.progress;
        }
        if (params && params.color){
          this.color = params.color;
        }
      });
    }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
