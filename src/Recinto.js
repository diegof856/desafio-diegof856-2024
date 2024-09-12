"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recinto = exports.Animal = void 0;

var Animal;
(function (Animal) {
    Animal["MACACO"] = "MACACO";
    Animal["LEAO"] = "LEAO";
    Animal["LEOPARDO"] = "LEOPARDO";
    Animal["CROCODILO"] = "CROCODILO";
    Animal["GAZELA"] = "GAZELA";
    Animal["HIPOPOTAMO"] = "HIPOPOTAMO";
})(Animal || (exports.Animal = Animal = {}));

// Define a classe Recinto
class Recinto {
    nomeBioma;
    capacidadeTotal;
    animaisPresentes; // Deve ser uma lista de animais presentes
    tipoAnimal;
    espacoLivre;
    id;
    constructor(nomeBioma, capacidadeTotal, espacoLivre, id, tipoAnimal, animaisPresentes) {
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
    calcularEspaco(animal, quantidade) {
        let espacoPorAnimal = 1;
        // Definindo o espaço para diferentes tipos de animais
        if (animal === Animal.LEAO || animal === Animal.CROCODILO) {
            espacoPorAnimal = 3;
        }
        else if (animal === Animal.LEOPARDO) {
            espacoPorAnimal = 2;
        }
        else if (animal === Animal.HIPOPOTAMO) {
            espacoPorAnimal = 4;
        }
        const espacoOcupado = quantidade * espacoPorAnimal;
        // Verificar se o recinto já possui outra espécie
        if (this.animaisPresentes.length > 0 && this.animaisPresentes[0] !== animal) {
            return espacoOcupado + 1; // Espaço extra se houver mais de uma espécie
        }
        return espacoOcupado;
    }
    podeAcomodar(animal, quantidade) {
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
    getTipoAnimal() {
        return this.tipoAnimal;
    }
    getCapacidadeTotal() {
        return this.capacidadeTotal;
    }
}
exports.Recinto = Recinto;
