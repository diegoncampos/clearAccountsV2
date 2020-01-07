import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-from-list',
  templateUrl: './select-from-list.page.html',
  styleUrls: ['./select-from-list.page.scss'],
})
export class SelectFromListPage implements OnInit {

  constructor(private modalController: ModalController) { }

  @Input() public participants: any[];
  public selected: any = null;
  public radioValue: any;

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss(null);
  }

  async sendSelected() {
    await this.modalController.dismiss(this.selected);
  }


  radioGroupChange(event) {
    this.selected = {userEmail: event.target.value, userName: event.target.name };
  }

}
