import {Caminhao} from '../caminhoes/caminhao';
import {Motorista} from '../motoristas/motorista';
import {Posto} from '../postos/posto';

export class Viagem {

    origem : any;
    destino : any;
    caminhao : Caminhao;
    motorista : Motorista;
    postos : Posto[];

}
