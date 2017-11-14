import { GoogleMapsAPIService } from './../services/google-maps-api.service';
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
    return true;
  }
  close(){
    this.modalEl.modal('hide');
    return true;
  }

  closeInternal(){
    this.onClose.next(null);
    this.close();
    return true;
  }

  constructor(private _rootNode: ElementRef,
    private db: AngularFireDatabase,
    private googleMaps: GoogleMapsAPIService) { }

  has(selector){
    return $(this._rootNode.nativeElement).find(selector).length;
  }

  ngOnInit() {
    (<any>$('.money')).mask('0.00', {reverse: true});
  }

  ngAfterViewInit(){
  }

  finish(){
    this.googleMaps.getLocation(this.postoChild.endereco).subscribe(location => {
      
                  this.postoChild.location = location;

                  this.postoChild.preco_diesel /= 100

                  this.db.list("/postos/").update( this.key, this.postoChild);

                  this.close();
  });
  
  };

}
