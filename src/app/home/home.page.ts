import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCol, 
  IonInfiniteScrollContent, IonGrid, IonRow, IonCard, 
  IonCardHeader, IonCardTitle, IonInfiniteScroll,
  IonCardSubtitle 
} from '@ionic/angular/standalone';
import { RickMortyService } from '../services/rick-morty';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonInfiniteScroll, 
    IonCardTitle, 
    IonCardHeader, 
    IonCard, 
    IonRow, 
    IonGrid, 
    IonInfiniteScrollContent, 
    IonCol, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCardSubtitle,
    RouterLink
  ]
})
export class HomePage implements OnInit {
  characters: any[] = [];
  currentPage = 1;

  constructor(private rmService: RickMortyService) { }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(event?: any) {
    this.rmService.getCharacters(this.currentPage).subscribe({
      next: (res) => {
        this.characters.push(...res.results);
        console.log(this.characters);
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error(err);
        if (event) event.target.complete();
      }
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadCharacters(event);
  }
}