import { Component, OnInit } from '@angular/core';
import { ALGEMEENKLASSEMENT_TEXT, BERGKLASSEMENT_TEXT, JONGERENKLASSEMENT_TEXT, PUNTENKLASSEMENT_TEXT } from 'src/app/constants/constants';

@Component({
  selector: 'app-klassementen',
  templateUrl: './klassementen.page.html',
  styleUrls: ['./klassementen.page.scss'],
})
export class KlassementenPage implements OnInit {


  ALGEMEENKLASSEMENT = ALGEMEENKLASSEMENT_TEXT
  BERGKLASSEMENT = BERGKLASSEMENT_TEXT
  PUNTENKLASSEMENT = PUNTENKLASSEMENT_TEXT
  JONGERENKLASSEMENT = JONGERENKLASSEMENT_TEXT

  activeKlassement = this.ALGEMEENKLASSEMENT
  constructor() { }

  ngOnInit() {
  }
  customActionSheetOptions = {
    header: 'Klassement',
    subHeader: 'Kies je type klassement',
  };

  selectKlassement(event: any) {
    this.activeKlassement = event.detail.value
  }
}
