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
  description: any;
  date: any;
  startTime: any;
  endTime: any;
  location: any;

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
        if (params && params.description){
          this.description = params.description;
        }
        if (params && params.date){
          this.date = params.date;
        }
        if (params && params.startTime){
          this.startTime = params.startTime;
        }
        if (params && params.endTime){
          this.endTime = params.endTime;
        }
        if (params && params.location){
          this.location = params.location;
        }

      });
    }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
