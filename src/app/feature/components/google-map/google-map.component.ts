import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapCircleComponent } from '../maps/map-circle/map-circle.component';
import { MapPolygoneComponent } from '../maps/map-polygone/map-polygone.component';
import { MapPolylineComponent } from '../maps/map-polyline/map-polyline.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    MapCircleComponent,
    MapPolygoneComponent,
    MapPolylineComponent,
  ],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss',
})
export class GoogleMapComponent {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private map!: google.maps.Map;
  private allMarkers: any[] = [];
  private polygoneLoc: any = [];
  private polylineLoc: any = [];
  private circleLoc: any = [];

  public selectedInfo!: { lat: number; lng: number };
  private directionService: any;
  private directionRender: any;
  private sourceAutoComplete: any;
  private destinationAutoComplete: any;
  public address: FormControl = new FormControl('');
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // document.body.setAttribute('data-bs-theme', 'light');
    setTimeout(() => {
      this.autoComplete('location');
    }, 0);

    if (!window.google) {
      console.error('Please load the Google Maps JavaScript API.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const mapElement = this.mapContainer.nativeElement;
        this.map = new google.maps.Map(mapElement, {
          zoom: 13,
          center: userLocation,
          mapId: 'map',
        });

        this.addLocationMarker(userLocation);
        this.mapClickEvt();

        // this.directionService = new google.maps.DirectionsService();
        // this.directionRender = new google.maps.DirectionsRenderer();
        // this.directionRender.setMap(this.map);

        // this.sourceAutoComplete = new google.maps.places.Autocomplete(
        //   document.getElementById('source') as any
        // );
        // this.destinationAutoComplete = new google.maps.places.Autocomplete(
        //   document.getElementById('destination') as any
        // );
      },
      (error) => {
        console.error('Error getting user location:', error.message);
      },
      { enableHighAccuracy: true }
    );
  }

  public mapClickEvt(): void {
    this.map.addListener('click', (event: google.maps.KmlMouseEvent) => {
      this.selectedInfo = {
        lat: event?.latLng?.lat() || 0,
        lng: event?.latLng?.lng() || 0,
      };

      //Get Place Detail
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: event?.latLng },
        (
          // results: google.maps.GeocoderResult[] | null,
          // status: google.maps.GeocoderStatus | null
          results: any,
          status: any
        ) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              console.log('Place details:', results[0]);
            } else {
              console.log('No results found');
            }
          } else {
            console.error('Geocoder failed due to: ', status);
          }
        }
      );
    });
  }

  private autoComplete(id: string): void {
    const input = document.getElementById(id) as HTMLInputElement;
    const handlePlace = (place: google.maps.places.PlaceResult) => {
      console.log('place.formatted_address', place.formatted_address);
      if (place.formatted_address) {
        const formControl = this.address;
        formControl.setValue({
          address: place.formatted_address,
          latitude: place?.geometry?.location?.lat(),
          longitude: place?.geometry?.location?.lng(),
        });

        const location: any = {
          lat: place?.geometry?.location?.lat(),
          lng: place?.geometry?.location?.lng(),
        };
      }
    };

    const autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: ['IN'] },
      strictBounds: true,
      fields: ['place_id', 'geometry', 'name', 'formatted_address'],
    });

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        setTimeout(() => {
          const place = autocomplete.getPlace();
          if (place) handlePlace(place);
        }, 200);
      });
    });
  }

  public clearValue(event: any, formGroup: string): void {
    if (!this.address?.value) {
      this.address?.setValue({
        address: null,
        latitude: null,
        longitude: null,
      });
    }
  }

  // addRemovePolylines() {
  //   const polylineCoords = [
  //     { lat: 21.235206917343216, lng: 72.8602391533203 },
  //     { lat: 21.178393920818863, lng: 72.8770619682617 },
  //     { lat: 21.18095497680386, lng: 72.77543843310545 },
  //     { lat: 21.235206917343216, lng: 72.8602391533203 },
  //   ];

  //   const polyline = new google.maps.Polyline({
  //     path: polylineCoords,
  //     strokeColor: '#111',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 4,
  //     map: this.map,
  //   });

  //   //Remove PolyLines
  //   setTimeout(() => {
  //     polyline.setMap(null);
  //   }, 3000);
  // }

  // addCircle() {
  //   const circleCenter = { lat: 21.235206917343216, lng: 72.8602391533203 };
  //   const circleRadius = 1000;
  //   const circle = new google.maps.Circle({
  //     center: circleCenter,
  //     radius: circleRadius,
  //     strokeColor: '#ff0000', // Set desired color (red)
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: '#ffffe0', // Set fill color (light yellow)
  //     fillOpacity: 0.3,
  //     map: this.map, // Set the map instance where the circle should be displayed
  //   });

  //   // setTimeout(() => {
  //   //   circle.setMap(null);
  //   // }, 3000);
  // }

  // mapClick(event: any) {
  //   console.log('event', event);
  // }

  // //   function calcRoute() {
  // //     //create request
  // //     var request = {
  // //         origin: document.getElementById("from").value,
  // //         destination: document.getElementById("to").value,
  // //         travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
  // //         unitSystem: google.maps.UnitSystem.IMPERIAL
  // //     }

  // //     //pass the request to the route method
  // //     directionsService.route(request, function (result, status) {
  // //         if (status == google.maps.DirectionsStatus.OK) {

  // //             //Get distance and time
  // //             const output = document.querySelector('#output');
  // //             output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

  // //             //display route
  // //             directionsDisplay.setDirections(result);
  // //         } else {
  // //             //delete route from map
  // //             directionsDisplay.setDirections({ routes: [] });
  // //             //center map in London
  // //             map.setCenter(myLatLng);

  // //             //show error message
  // //             output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
  // //         }
  // //     });

  // // }

  // addPolygone() {
  //   const circle = new google.maps.Polygon({
  //     paths: [
  //       { lat: 37.7749, lng: -122.4194 }, // San Francisco
  //       { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  //       { lat: 47.6062, lng: -122.3321 }, // Seattle
  //       { lat: 37.7749, lng: -122.4194 }, // Close the polygon path i think optional
  //     ],
  //     strokeColor: '#FF0000', // Set polygon color (red)
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: '#FF0000',
  //     fillOpacity: 0.3,
  //     map: this.map,
  //   });

  //   setTimeout(() => {
  //     circle.setMap(null);
  //   }, 10000);
  // }]

  private addLocationMarker(location: { lat: number; lng: number }): void {
    [location].forEach((res) => {
      const content = `<b class="text-dark">I am Here</b>`;
      const infoWindow = new google.maps.InfoWindow({ content: content });
      // const iconSize = new google.maps.Size(32, 32);
      // const customIconUrl =
      //   'https://img.freepik.com/free-vector/modern-elegant-wavy-indian-flag-background_1055-7111.jpg?size=626&ext=jpg';
      const marker = new google.maps.Marker({
        position: res,
        map: this.map,
        // icon: {
        //   url: customIconUrl,
        //   scaledSize: iconSize,
        // },
      });
      new google.maps.Circle({
        center: res,
        radius: 4000,
        strokeColor: '#ff0000', // Set desired color (red)
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ffffe0', // Set fill color (light yellow)
        fillOpacity: 0.3,
        map: this.map, // Set the map instance where the circle should be displayed
      });

      this.allMarkers.push(marker);
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    });
  }

  public addMarker(): void {
    const data = [
      { lat: 21.2215782, lng: 72.8544903 },
      { lat: 21.2216782, lng: 72.8548903 },
      { lat: 21.2217782, lng: 72.8540903 },
    ];
    data.forEach((res) => {
      const content = `<b class="text-dark">I am Here,With ${res.lat} - ${res.lng}...</b>`;
      const infoWindow = new google.maps.InfoWindow({ content: content });
      // const iconSize = new google.maps.Size(32, 32);
      // const customIconUrl =
      //   'https://img.freepik.com/free-vector/modern-elegant-wavy-indian-flag-background_1055-7111.jpg?size=626&ext=jpg';
      const marker = new google.maps.Marker({
        position: res,
        map: this.map,
        // icon: {
        //   url: customIconUrl,
        //   scaledSize: iconSize,
        // },
      });

      this.allMarkers.push(marker);
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    });

    // for (const marker of this.allMarkers) {
    //   marker.setMap(null);
    // }
    // this.allMarkers = [];
    // const markerToRemove = this.allMarkers[0];
    // markerToRemove.setMap(null);
    // this.allMarkers.splice(0, 1);
  }

  public addPolygone(val: any[]): void {
    this.polygoneLoc?.length && this.polygoneLoc.setMap(null);

    val.forEach((res) => {
      this.polygoneLoc.push(
        new google.maps.Polygon({
          paths: res,
          strokeColor: '#FF0000', // Set polygon color (red)
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.3,
          map: this.map,
        })
      );
    });
  }

  public addPolyline(val: any[]): void {
    // const polylineCoords = [
    //     { lat: 21.235206917343216, lng: 72.8602391533203 },
    //     { lat: 21.178393920818863, lng: 72.8770619682617 },
    //     { lat: 21.18095497680386, lng: 72.77543843310545 },
    //     { lat: 21.235206917343216, lng: 72.8602391533203 },
    //   ];
    //   const polyline = new google.maps.Polyline({
    //     path: polylineCoords,
    //     strokeColor: '#111',
    //     strokeOpacity: 0.8,
    //     strokeWeight: 4,
    //     map: this.map,
    //   });
    //   //Remove PolyLines
    //   setTimeout(() => {
    //     polyline.setMap(null);
    //   }, 3000);
    // }

    this.polylineLoc?.length && this.polylineLoc.setMap(null);

    val.forEach((res) => {
      this.polylineLoc.push(
        new google.maps.Polyline({
          path: res,
          strokeColor: '#111',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map: this.map,
        })
      );
    });
  }

  public addCircle(val: any[]): void {
    this.circleLoc?.length && this.circleLoc.setMap(null);

    val.forEach((res) => {
      this.circleLoc.push(
        new google.maps.Circle({
          center: { lat: res.lat, lng: res.lng },
          radius: res.radious || 1000,
          strokeColor: '#ff0000', // Set desired color (red)
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#ffffe0', // Set fill color (light yellow)
          fillOpacity: 0.3,
          map: this.map, // Set the map instance where the circle should be displayed
        })
      );
    });
    // const circle = new google.maps.Circle({
    //   center: circleCenter,
    //   radius: circleRadius,
    //   strokeColor: '#ff0000', // Set desired color (red)
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: '#ffffe0', // Set fill color (light yellow)
    //   fillOpacity: 0.3,
    //   map: this.map, // Set the map instance where the circle should be displayed
    // });
  }

  public dftPolygone(): void {
    this.polygoneLoc.push(
      new google.maps.Polygon({
        paths: [
          { lat: 37.7749, lng: -122.4194 }, // San Francisco
          { lat: 34.0522, lng: -118.2437 }, // Los Angeles
          { lat: 47.6062, lng: -122.3321 }, // Seattle
          { lat: 37.7749, lng: -122.4194 }, // Close the polygon path i think optional
        ],
        strokeColor: '#FF0000', // Set polygon color (red)
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.3,
        map: this.map,
      })
    );
  }

  public dftPolyline(): void {
    this.polylineLoc.push(
      new google.maps.Polyline({
        path: [
          { lat: 35.127383439183824, lng: -81.9960055836246 },
          { lat: 53.044066939955584, lng: -98.1678805836246 },
        ],
        strokeColor: '#111',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: this.map,
      })
    );
  }

  public dftCircle(): void {
    this.circleLoc.push(
      new google.maps.Circle({
        center: { lat: 21.235206917343216, lng: 72.8602391533203 },
        radius: 1000,
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ffffe0',
        fillOpacity: 0.3,
        map: this.map,
      })
    );
  }
}
