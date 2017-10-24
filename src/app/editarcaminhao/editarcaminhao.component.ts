import { AngularFireDatabase } from 'angularfire2/database';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Caminhao } from './../caminhoes/caminhao';
import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-editarcaminhao',
  templateUrl: './editarcaminhao.component.html',
  styleUrls: ['./editarcaminhao.component.css']
})
export class EditarcaminhaoComponent implements OnInit, AfterViewInit {

  @Input() caminhaoChild: Caminhao;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  modalEl = null;
  id: string = this.uniqueId('modal_');
  key;

  uniqueId(prefix: string){
    return prefix;
  }
  open(key){
    this.modalEl = $('#editarCaminhao');
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
    // console.log(this.caminhaoChild);
    this.db.list("/caminhoes/").update( this.key, this.caminhaoChild);
    this.close();

  };

}
