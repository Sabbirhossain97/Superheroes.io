
import { Superhero } from '@/types/superhero';

// Mock data based on your JSON structure - in real app, this would come from an API
export const superheroes: Superhero[] = [
  {
    id: 1,
    name: "A-Bomb",
    slug: "1-a-bomb",
    powerstats: {
      intelligence: 38,
      strength: 100,
      speed: 17,
      durability: 80,
      power: 24,
      combat: 64
    },
    appearance: {
      gender: "Male",
      race: "Human",
      height: ["6'8", "203 cm"],
      weight: ["980 lb", "441 kg"],
      eyeColor: "Yellow",
      hairColor: "No Hair"
    },
    biography: {
      fullName: "Richard Milhouse Jones",
      alterEgos: "No alter egos found.",
      aliases: ["Rick Jones"],
      placeOfBirth: "Scarsdale, Arizona",
      firstAppearance: "Hulk Vol 2 #2 (April, 2008) (as A-Bomb)",
      publisher: "Marvel Comics",
      alignment: "good"
    },
    work: {
      occupation: "Musician, adventurer, author; formerly talk show host",
      base: "-"
    },
    connections: {
      groupAffiliation: "Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom",
      relatives: "Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)"
    },
    images: {
      xs: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/xs/1-a-bomb.jpg",
      sm: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/sm/1-a-bomb.jpg",
      md: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/md/1-a-bomb.jpg",
      lg: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/lg/1-a-bomb.jpg"
    }
  },
  {
    id: 2,
    name: "Spider-Man",
    slug: "2-spider-man",
    powerstats: {
      intelligence: 90,
      strength: 55,
      speed: 67,
      durability: 74,
      power: 74,
      combat: 85
    },
    appearance: {
      gender: "Male",
      race: "Human",
      height: ["5'10", "178 cm"],
      weight: ["167 lb", "76 kg"],
      eyeColor: "Hazel",
      hairColor: "Brown"
    },
    biography: {
      fullName: "Peter Benjamin Parker",
      alterEgos: "No alter egos found.",
      aliases: ["Spidey", "Web-Slinger", "Wall-Crawler"],
      placeOfBirth: "New York City",
      firstAppearance: "Amazing Fantasy #15 (1962)",
      publisher: "Marvel Comics",
      alignment: "good"
    },
    work: {
      occupation: "Photographer, Teacher",
      base: "New York City"
    },
    connections: {
      groupAffiliation: "Avengers, Fantastic Four, Future Foundation",
      relatives: "Ben Parker (uncle, deceased), May Parker (aunt)"
    },
    images: {
      xs: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/xs/620-spider-man.jpg",
      sm: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/sm/620-spider-man.jpg",
      md: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/md/620-spider-man.jpg",
      lg: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/lg/620-spider-man.jpg"
    }
  },
  {
    id: 3,
    name: "Batman",
    slug: "3-batman",
    powerstats: {
      intelligence: 81,
      strength: 40,
      speed: 29,
      durability: 55,
      power: 63,
      combat: 90
    },
    appearance: {
      gender: "Male",
      race: "Human",
      height: ["6'2", "188 cm"],
      weight: ["210 lb", "95 kg"],
      eyeColor: "Blue",
      hairColor: "Black"
    },
    biography: {
      fullName: "Bruce Wayne",
      alterEgos: "No alter egos found.",
      aliases: ["Dark Knight", "World's Greatest Detective"],
      placeOfBirth: "Gotham City",
      firstAppearance: "Detective Comics #27 (1939)",
      publisher: "DC Comics",
      alignment: "good"
    },
    work: {
      occupation: "CEO of Wayne Enterprises, Vigilante",
      base: "Gotham City"
    },
    connections: {
      groupAffiliation: "Justice League, Batman Family",
      relatives: "Thomas Wayne (father, deceased), Martha Wayne (mother, deceased)"
    },
    images: {
      xs: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/xs/70-batman.jpg",
      sm: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/sm/70-batman.jpg",
      md: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/md/70-batman.jpg",
      lg: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/lg/70-batman.jpg"
    }
  }
];

export const publishers = Array.from(new Set(superheroes.map(hero => hero.biography.publisher)));
