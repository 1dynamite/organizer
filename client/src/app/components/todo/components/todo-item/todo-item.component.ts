import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from 'src/app/components/dialogs/update-dialog/update-dialog.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() title = '';

  @Output() editItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onEditClick(event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { title: this.title },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) return;

      this.editItemEvent.emit(result);
    });
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;

      this.deleteItemEvent.emit();
    });
  }
}
