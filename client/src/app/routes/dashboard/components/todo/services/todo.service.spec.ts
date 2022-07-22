import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.items.length).toBe(0);
  });

  it('.addItem should append item to the beginning of "items" array', () => {
    service.addItem('some item');
    expect(service.items.length).toBe(1);
    service.addItem('2nd item');
    expect(service.items.length).toBe(2);
    expect(service.items[0]).toBe('2nd item');
  });

  it('.deleteItem should remove item from "items" array', () => {
    const myId = 'myId',
      firstItemId = 'first item ID';
    service.items = [{ _id: firstItemId }, { _id: myId }];
    service.deleteItem(myId);

    expect(service.items.length).toBe(1);
    expect(service.items[0]._id).toBe(firstItemId);
  });

  it('.updateItem should update item by id', () => {
    const myId = 'myId';
    service.items = [{ _id: myId, data: 'some data' }];
    service.updateItem(myId, { data: 'changed' });

    expect(service.items.length).toBe(1);
    expect(service.items[0].data).toBe('changed');
  });

  it('.updateManyItems should update priorityIndex of many items', () => {
    const firstId = '1stId',
      secondId = '2ndId';
    service.items = [
      { _id: firstId, priorityIndex: 1 },
      { _id: secondId, priorityIndex: 2 },
    ];

    const myArray = [{ priorityIndex: 4 }, { priorityIndex: 3 }];

    service.updateManyItems(myArray);

    expect(service.items[0].priorityIndex).toBe(4);
    expect(service.items[1].priorityIndex).toBe(3);
  });

  it('.reorder should reorder "items" array and return new ordering', () => {
    const firstId = '1stId',
      secondId = '2ndId',
      thirdId = '3rdId';

    service.items = [
      { _id: firstId, priorityIndex: 3 },
      { _id: secondId, priorityIndex: 2 },
      { _id: thirdId, priorityIndex: 1 },
    ];

    const returnValue = service.reOrder({
      previousIndex: 0,
      currentIndex: 2,
    } as CdkDragDrop<any[]>);

    expect(service.items[0]).toEqual({ _id: secondId, priorityIndex: 2 });
    expect(service.items[1]).toEqual({ _id: thirdId, priorityIndex: 1 });
    expect(service.items[2]).toEqual({ _id: firstId, priorityIndex: 3 });

    expect(returnValue).toEqual([
      { _id: secondId, myData: { priorityIndex: 3 } },
      { _id: thirdId, myData: { priorityIndex: 2 } },
      { _id: firstId, myData: { priorityIndex: 1 } },
    ]);
  });

  it('.completeItem should remove item from "items" array', () => {
    jasmine.clock().install();

    const myId = 'myId';
    service.items = [{ _id: myId }];
    service.completeItem(myId);

    jasmine.clock().tick(300);

    expect(service.items.length).toBe(0);

    jasmine.clock().uninstall();
  });
});
