import { StorageService } from 'src/app/core/services/storage.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() requests?: ISOSRequest[];
  @Output() clickedRequest = new EventEmitter<ISOSRequest>();
  toggleStatus: string = 'Ẩn bớt';
  toggle() {
    if (this.toggleStatus == 'Ẩn bớt') {
      document.getElementById('request_list')?.classList.add('n0');
      this.toggleStatus = 'Hiện thêm';
    } else {
      document.getElementById('request_list')?.classList.remove('n0');
      this.toggleStatus = 'Ẩn bớt';
    }
  }
  constructor(private StorageService: StorageService) {
    console.log(this.requests);
  }
  ngOnInit(): void {
    console.log(this.requests);
    console.log();
  }

  chooseRequest(request: ISOSRequest) {
    this.clickedRequest.emit(request);
  }
  ngOnChanges(changes: SimpleChanges): void {
    let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

    let loader = new Loader({
      apiKey: environment.googleApiKey,
    });

    // const locationButton = document.createElement("button");
    // locationButton.textContent = "Current position";
    // locationButton.classList.add("toggle");
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.StorageService.getLocation(),
        zoom: 15,
        styles: environment.mapStyle,
      });

      infoWindow = new google.maps.InfoWindow();
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);

      this.requests?.forEach((request) => {
        addMarker(request, this.chooseRequest.bind(this));
      });
    });

    function addMarker(request: ISOSRequest, chooseRequest: Function) {
      const icon = (type: string) => {
        if (type == 'orange')
          return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMS4wNzUiIGhlaWdodD0iNDQuOTI2IiB2aWV3Qm94PSIwIDAgMzEuMDc1IDQ0LjkyNiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjtzdHJva2U6I2M4YzhjODt9LmJ7ZmlsbDojZmY2OTM3O308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUgMC41KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik00Mi4wNzUsMTguMDM4YzAsNi44MzUtMTAuMTgsMjIuNzgyLTEzLjc4OSwyOC4yMThhMS41LDEuNSwwLDAsMS0yLjUsMEMyMi4xOCw0MC44MTksMTIsMjQuODcyLDEyLDE4LjAzOGExNS4wMzgsMTUuMDM4LDAsMCwxLDMwLjA3NSwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyIC0zKSIvPjxjaXJjbGUgY2xhc3M9ImIiIGN4PSI5LjUxOSIgY3k9IjkuNTE5IiByPSI5LjUxOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS43MTEgNS40NSkiLz48L2c+PC9zdmc+';
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMi41OTYiIGhlaWdodD0iNDcuMTQ4IiB2aWV3Qm94PSIwIDAgMzIuNTk2IDQ3LjE0OCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjtzdHJva2U6I2M4YzhjODt9LmJ7ZmlsbDojZTExOTAwO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUgMC41KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik00My42LDE4LjhjMCw3LjE4LTEwLjcsMjMuOTM0LTE0LjQ4NywyOS42NDVhMS41NzIsMS41NzIsMCwwLDEtMi42MjIsMEMyMi43LDQyLjczMiwxMiwyNS45NzgsMTIsMTguOGExNS44LDE1LjgsMCwwLDEsMzEuNiwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyIC0zKSIvPjxjaXJjbGUgY2xhc3M9ImIiIGN4PSIxMCIgY3k9IjEwIiByPSIxMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiA1LjcyNikiLz48L2c+PC9zdmc+';
      };
      var location = request?.location?.split(',');
      var lat = parseFloat(location![0]);
      var lng = parseFloat(location![1]);

      var marker = new google.maps.Marker({
        position: { lat: <number>lat, lng: <number>lng },
        map: map,
        icon: icon(request.priority_type == 'high' ? 'red' : 'orange'),
      });

      marker.addListener('click', function () {
        chooseRequest(request);
      });
    }
    // locationButton.addEventListener("click", getCurrentLocation);

    // function getCurrentLocation() {
    //   // Try HTML5 geolocation.
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position: GeolocationPosition) => {
    //         const pos = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //         };
    //         map.setCenter(pos);
    //       },
    //       () => {
    //         handleLocationError(true, infoWindow, map.getCenter()!);
    //       }
    //     );
    //   } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter()!);
    //   }
    // }

    // function handleLocationError(
    //   browserHasGeolocation: boolean,
    //   infoWindow: google.maps.InfoWindow,
    //   pos: google.maps.LatLng
    // ) {
    //   infoWindow.setPosition(pos);
    //   infoWindow.setContent(
    //     browserHasGeolocation
    //       ? "Error: The Geolocation service failed."
    //       : "Error: Your browser doesn't support geolocation."
    //   );
    //   infoWindow.open(map);
    // }
  }
}
