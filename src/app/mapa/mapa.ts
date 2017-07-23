import { googleMapsConfig } from './../../environments/googleMapsConfig';
export class Mapa extends google.maps.Map {

    constructor() {
        super(document.getElementById('map'), {
			zoom: 4,
			center: {lat: -16.4483014, lng: -68.9872348}
        });

        this.setStyle();
    }


    private getStyle() : google.maps.StyledMapType {
        // map style
        // mapa noturno e dia
        // mapa durante o dia é entre as 6h e as 18h
        // mapa noturno no outro horário
        var hora = (new Date()).getHours();

        if(hora > 6 && hora < 18)
        var style : any = googleMapsConfig.style_day;
        else
        var style : any = googleMapsConfig.style_night;

        var mapStyle = new google.maps.StyledMapType(<google.maps.MapTypeStyle[]> style);

        return mapStyle;
    }
    
    private setStyle() : void {
        //Associate the styled map with the MapTypeId and set it to display.
        this.mapTypes.set('styled_map', this.getStyle());
        this.setMapTypeId('styled_map');
    }
}
