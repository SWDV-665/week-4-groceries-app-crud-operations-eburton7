import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  groceryItems: string[] = [
    'Apples',
    'Cheesecake',
    'Celery',
    'Green Tea',
    'Burgers',
    'Tuna',
    'Pasta',
  ];

  newItem: string = '';
  constructor(private alertController: AlertController) {
  }
  
  addItem() {
    if (this.newItem.trim() !== '') {
      this.groceryItems.push(this.newItem.trim());
      this.newItem = '';
    }
  }

  async editItem(item: string) {
    const alert = await this.alertController.create({
      header: 'Edit Item',
      inputs: [
        {
          name: 'editedItem',
          type: 'text',
          value: item,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            const index = this.groceryItems.indexOf(item);
            if (index !== -1) {
              this.groceryItems[index] = data.editedItem.trim();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteItem(item: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete '${item}'?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            const index = this.groceryItems.indexOf(item);
            if (index !== -1) {
              this.groceryItems.splice(index, 1);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}