import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickMortyService } from '../../services/rick-morty';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CharacterDetailPage implements OnInit {
  character: any = null;
  private route = inject(ActivatedRoute);
  private rmService = inject(RickMortyService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rmService.getCharacterDetails(Number(id)).subscribe({
        next: (data) => {
          this.character = data;
        },
        error: (err) => console.error(err)
      });
    }
  }
}