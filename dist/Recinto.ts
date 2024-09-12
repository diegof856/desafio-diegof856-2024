// Define o enum Animal
export enum Animal {
    MACACO = 'MACACO',
    LEAO = 'LEAO',
    LEOPARDO = 'LEOPARDO',
    CROCODILO = 'CROCODILO',
    GAZELA = 'GAZELA',
    HIPOPOTAMO = 'HIPOPOTAMO'
  }
  
  // Define a classe Recinto
  export class Recinto {
    private nomeBioma: string;
    private capacidadeTotal: number;
    private animaisPresentes: Animal[]; // Deve ser uma lista de animais presentes
    private tipoAnimal: Animal;
    private espacoLivre: number;
    private id: number;
  
    constructor(
      nomeBioma: string,
      capacidadeTotal: number,
      espacoLivre: number,
      id: number,
      tipoAnimal: Animal,
      animaisPresentes: Animal[]
    ) {
      this.nomeBioma = nomeBioma;
      this.capacidadeTotal = capacidadeTotal;
      this.espacoLivre = espacoLivre;
      this.id = id;
      this.tipoAnimal = tipoAnimal;
      this.animaisPresentes = animaisPresentes || [];
    }
  
    getIdentificador() {
      return `Recinto ${this.id}`;
    }
  
    calcularEspaco(animal: Animal, quantidade: number): number {
      let espacoPorAnimal = 1;
  
      // Definindo o espaço para diferentes tipos de animais
      if (animal === Animal.LEAO || animal === Animal.CROCODILO) {
        espacoPorAnimal = 3;
      } else if (animal === Animal.LEOPARDO) {
        espacoPorAnimal = 2;
      } else if (animal === Animal.HIPOPOTAMO) {
        espacoPorAnimal = 4;
      }
  
      const espacoOcupado = quantidade * espacoPorAnimal;
  
      // Verificar se o recinto já possui outra espécie
      if (this.animaisPresentes.length > 0 && this.animaisPresentes[0] !== animal) {
        return espacoOcupado + 1; // Espaço extra se houver mais de uma espécie
      }
  
      return espacoOcupado;
    }
  
    podeAcomodar(animal: Animal, quantidade: number): boolean {
      // Verificar se há espaço livre suficiente
      if (this.espacoLivre < this.calcularEspaco(animal, quantidade)) {
        return false;
      }
  
      // Regras especiais para Hipopótamo
      if (animal === Animal.HIPOPOTAMO && this.nomeBioma !== 'savana e rio') {
        return false;
      }
  
      // Verificar se o animal pode coabitar com as outras espécies no recinto
      if (this.animaisPresentes.length > 0) {
        const primeiraEspecie = this.animaisPresentes[0];
  
        // Carnívoros só podem habitar com a própria espécie
        if ([Animal.LEAO, Animal.LEOPARDO, Animal.CROCODILO].includes(primeiraEspecie) && primeiraEspecie !== animal) {
          return false;
        }
      }
  
      return true;
    }
  
    getTipoAnimal(): Animal {
      return this.tipoAnimal;
    }
  
    getCapacidadeTotal(): number {
      return this.capacidadeTotal;
    }
  }
  