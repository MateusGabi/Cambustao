import {Caminhao} from '../caminhoes/caminhao';
import {Motorista} from '../motorista/motorista';
import {Posto} from '../postos/posto';

export class Viagem {

    origem : string;
    destino : string;
    caminhao : Caminhao;
    motorista : Motorista;
    postos : Posto[];

}
