import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      customClass="bg-light-blue"
      (add)="addCity()">
      <img src="assets/img/city.png" width="200px" />

      <ng-template #rowRef let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cardType = CardType.CITY;
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private cityService: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.cityService.addAll(c));

    this.cityService.cities$.subscribe((c) => (this.cities = c));
  }

  addCity() {
    this.cityService.addOne(randomCity());
  }
  deleteCity(id: number) {
    this.cityService.deleteOne(id);
  }
}
