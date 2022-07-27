import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  items: any[] = [];

  constructor() {}

  addItem(myData: any) {
    this.items = [myData, ...this.items];
  }

  deleteItem(_id: string) {
    const newValue = this.items.filter((element) => element._id !== _id);

    this.items = newValue;
  }

  updateItem(_id: string, myData: any) {
    const myIndex = this.items.findIndex((element) => element._id === _id);

    const element = this.items[myIndex];

    this.items[myIndex] = { ...element, ...myData };

    this.items = [...this.items];
  }

  updateManyItems(myArray: any[]) {
    myArray.forEach((item, index) => {
      this.items[index].priorityIndex = item.priorityIndex;
    });
  }

  reOrder(event: CdkDragDrop<any[]>) {
    const oldOrdering = this.items.map((item) => ({
      _id: item._id,
      priorityIndex: item.priorityIndex,
    }));

    moveItemInArray(this.items, event.previousIndex, event.currentIndex);

    const newOrdering = this.items;

    const myArray: any[] = oldOrdering.map((item, index) => ({
      _id: newOrdering[index]._id,
      myData: {
        priorityIndex: item.priorityIndex,
      },
    }));

    return myArray;
  }

  completeItem(_id: string) {
    const cb = () => {
      const newValue = this.items.filter((element) => element._id !== _id);

      this.items = newValue;
    };

    setTimeout(cb, 300);
  }
}
