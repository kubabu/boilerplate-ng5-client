import { Component, OnInit } from '@angular/core';
import { Hero } from './../../models/hero';
import { HeroService } from './../../services/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(h => this.setHeroes(h));
  }

  setHeroes(heroes: Hero[]): void {
    this.heroes = heroes;
  }

  add(name: String): void {
    name = name.trim();
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(
      _ => {
        this.heroes = this.heroes.filter(h => h !== hero);
      }
    );
  }

}
