import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCol, 
  IonInfiniteScrollContent, IonGrid, IonRow, IonCard, 
  IonCardHeader, IonCardTitle, IonInfiniteScroll,
  IonCardSubtitle, IonSearchbar, IonIcon, IonButton 
} from '@ionic/angular/standalone';
import { RickMortyService } from '../services/rick-morty';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonInfiniteScroll, IonCardTitle, IonCardHeader, 
    IonCard, IonRow, IonGrid, IonInfiniteScrollContent, IonCol, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonCardSubtitle,
    IonSearchbar, IonIcon, IonButton, RouterLink
  ]
})
export class HomePage implements OnInit {
   // Lo que se muestra en pantalla
  characters: any[] = [];  
 
   // Respaldo para las búsquedas
  allCharacters: any[] = [];  
  currentPage = 1;
  // Para ocultar/mostrar scroll infinito
  isSearchEmpty = true;     

  constructor(private rmService: RickMortyService) {
    // iconos de Ionic
    addIcons({ heartOutline, heart });
  }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(event?: any) {
    this.rmService.getCharacters(this.currentPage).subscribe({
      next: (res) => {
        // Inicializamos isFav en false para cada personaje nuevo que llega
        const newCharacters = res.results.map((c: any) => ({...c, isFav: false}));
        
        this.characters.push(...newCharacters);
        this.allCharacters = [...this.characters]; 
        
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

  // Lógica del Buscador para nombre de personaje y poder filtrarlo
  filterCharacters(event: any) {
    const query = event.target.value.toLowerCase();
    
    if (query && query.trim() !== '') {
      this.isSearchEmpty = false;
      this.characters = this.allCharacters.filter((c) => {
        return c.name.toLowerCase().indexOf(query) > -1;
      });
    } else {
      this.isSearchEmpty = true;
      this.characters = [...this.allCharacters];
    }
  }

  toggleFavorite(character: any) {
    // Cambia el estado del corazón
    character.isFav = !character.isFav;
    
    if (character.isFav) {
      console.log('Guardando en favoritos a:', character.name);
      // lógica de SQLite para insertar
    } else {
      console.log('Eliminando de favoritos a:', character.name);
      //lógica de SQLite para borrar
    }
  }
}