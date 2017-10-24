import { AngularFireDatabase } from 'angularfire2/database';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Motorista } from './../motorista/motorista';
import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-editarmotorista',
  templateUrl: './editarmotorista.component.html',
  styleUrls: ['./editarmotorista.component.css']
})
export class EditarmotoristaComponent implements OnInit, AfterViewInit {

  @Input() motoristaChild: Motorista;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  modalEl = null;
  id: string = this.uniqueId('modal_');
  key;

  uniqueId(prefix: string){
    return prefix;
  }
  open(key){
    this.modalEl = $('#editarMotorista');
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
    this.db.list("/motoristas/").update( this.key, this.motoristaChild);
    this.close();

  };

}
