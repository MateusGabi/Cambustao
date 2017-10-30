import { AngularFireDatabase } from 'angularfire2/database';
import { Posto } from './../postos/posto';
import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';

declare var $;

@Component({
  selector: 'app-editarposto',
  templateUrl: './editarposto.component.html',
  styleUrls: ['./editarposto.component.css']
})

export class EditarpostoComponent implements OnInit {

  @Input() postoChild: Posto;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  

  modalEl = null;
  id: string = this.uniqueId('modal_');
  key;

  uniqueId(prefix: string){
    return prefix;
  }
  open(key){
    this.modalEl = $('#editarPosto');
    this.key = key;
    this.modalEl.modal('show');
  }
  close(){
    this.modalEl.modal('hide');
  }

  closeInternal(){
    this.onClose.next(null);
    this.close();
  }

  constructor(private _rootNode: ElementRef,
    private db: AngularFireDatabase) { }

  has(selector){
    return $(this._rootNode.nativeElement).find(selector).length;
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
  }
  finish(){
    this.db.list("/postos/").update( this.key, this.postoChild);
    this.close();

  };

}
