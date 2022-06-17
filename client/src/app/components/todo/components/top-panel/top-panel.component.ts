import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from 'src/app/components/dialogs/update-dialog/update-dialog.component';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss'],
})
export class TopPanelComponent implements OnInit {
  @Input() title: string = '';
  /*  @Output() addItemEvent = new EventEmitter<any>(); */

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /* addItem() {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { title: '' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) return;

      this.addItemEvent.emit(result);
    });
  } */
}
