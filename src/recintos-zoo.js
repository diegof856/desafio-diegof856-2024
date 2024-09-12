"use strict";

// Define o enum Animal
// Este enum lista os tipos de animais que podem ser analisados
var Animal;
(function (Animal) {
    Animal["MACACO"] = "MACACO";
    Animal["LEAO"] = "LEAO";
    Animal["LEOPARDO"] = "LEOPARDO";
    Animal["CROCODILO"] = "CROCODILO";
    Animal["GAZELA"] = "GAZELA";
    Animal["HIPOPOTAMO"] = "HIPOPOTAMO";
})(Animal || (Animal = {}));

// Define os requisitos de cada animal
// Cada animal tem um requisito de tamanho e uma lista de biomas onde ele pode viver
const RequisitosAnimal = {
    [Animal.LEAO]: { tamanho: 3, biomas: ["savana"] },
    [Animal.LEOPARDO]: { tamanho: 2, biomas: ["savana"] },
    [Animal.CROCODILO]: { tamanho: 3, biomas: ["rio"] },
    [Animal.MACACO]: { tamanho: 1, biomas: ["savana", "floresta"] },
    [Animal.GAZELA]: { tamanho: 2, biomas: ["savana"] },
    [Animal.HIPOPOTAMO]: { tamanho: 4, biomas: ["savana", "rio"] }
};

// Define os recintos
// Cada recinto tem um ID, bioma, tamanho total e um objeto que lista os animais presentes e suas quantidades
const recintos = [
    { id: 1, bioma: "savana", tamanho: 10, animais: { MACACO: 3 } },
    { id: 2, bioma: "floresta", tamanho: 5, animais: {} },
    { id: 3, bioma: "savana e rio", tamanho: 7, animais: { GAZELA: 1 } },
    { id: 4, bioma: "rio", tamanho: 8, animais: {} },
    { id: 5, bioma: "savana", tamanho: 9, animais: { LEAO: 1 } }
];

// Define a classe RecintosZoo para análise dos recintos disponíveis para um determinado animal e quantidade
class RecintosZoo {

    // Método para analisar recintos
    analisaRecintos(animal, quantidade) {
        // Verifica se o animal fornecido está em branco
        if (!animal || animal.length === 0) {
            return { erro: "Animal em branco", recintosViaveis: false };
        }

        // Verifica se o animal fornecido é válido
        if (!RequisitosAnimal[animal]) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }
        // Verifica se a quantidade de animais fornecida é válida
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }

        // Array para armazenar os recintos viáveis
        let recintosViaveis = [];


        // Itera sobre cada recinto para determinar se ele é viável
        recintos.forEach(recinto => {
            const tamanhoMaximo = recinto.tamanho; // Tamanho máximo do recinto
            let tamanhoTotalAnimais = 0; // Tamanho total dos animais no recinto
            let possuiCarnivoro = false; // Verifica se há carnívoros no recinto
            let possuiOutraEspecie = false; // Verifica se já existe outra espécie no recinto
            let biomaEhAdequado;

            // Se o animal for um MACACO, considera biomas específicos, incluindo "savana e rio"
            if (animal === 'MACACO') {
                biomaEhAdequado = RequisitosAnimal[animal].biomas.includes(recinto.bioma) ||
                    (recinto.bioma === "savana e rio" &&
                        (RequisitosAnimal[animal].biomas.includes("savana") || RequisitosAnimal[animal].biomas.includes("rio")));
            } else {
                // Para os demais animais, verifica se o bioma é adequado com base nos requisitos
                biomaEhAdequado = RequisitosAnimal[animal].biomas.includes(recinto.bioma);
            }

            // Se o bioma não for adequado, pula para o próximo recinto
            if (!biomaEhAdequado) {
                return;
            }

            // Itera sobre os animais já presentes no recinto
            for (const [animalNoRecinto, quantidadeNoRecinto] of Object.entries(recinto.animais)) {
                if (RequisitosAnimal[animalNoRecinto]) {
                    const tamanhoAnimal = RequisitosAnimal[animalNoRecinto].tamanho;
                    tamanhoTotalAnimais += (tamanhoAnimal * quantidadeNoRecinto); // Calcula o espaço ocupado pelos animais

                    // Verifica se há carnívoros no recinto
                    if ([Animal.LEAO, Animal.LEOPARDO, Animal.CROCODILO].includes(animalNoRecinto)) {
                        possuiCarnivoro = true;
                    }
                    // Se o animal no recinto não for o mesmo que está sendo analisado, marca que há outra espécie
                    if (animalNoRecinto !== animal) {
                        possuiOutraEspecie = true;
                    }
                }
            }

            // Hipopótamos só podem ficar no bioma "savana e rio"
            if (animal === Animal.HIPOPOTAMO && !(recinto.bioma === 'savana e rio')) {
                return;
            }

            // Carnívoros não podem conviver com outras espécies
            if (possuiCarnivoro && ![Animal.LEAO, Animal.LEOPARDO, Animal.CROCODILO].includes(animal)) {
                return;
            }

            // Adiciona o tamanho necessário para o novo animal
            const tamanhoAnimal = RequisitosAnimal[animal].tamanho;
            const tamanhoNecessario = tamanhoAnimal * quantidade;
            tamanhoTotalAnimais += tamanhoNecessario;

            // Se houver outra espécie no recinto, adiciona uma penalidade de espaço
            if (possuiOutraEspecie) {
                tamanhoTotalAnimais += 1;
            }

            // Calcula o espaço livre restante no recinto
            const espacoLivre = tamanhoMaximo - tamanhoTotalAnimais;
            console.log(`Espaco livre: ${espacoLivre}`);
            // Se houver espaço suficiente, adiciona o recinto como viável
            if (espacoLivre >= 0) {
                recintosViaveis.push(`Recinto ${recinto.id} (espaço livre: ${espacoLivre} total: ${tamanhoMaximo})`);
            }
        });

        // Se nenhum recinto for viável, retorna um erro
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }

        // Retorna os recintos viáveis encontrados
        return { erro: false, recintosViaveis };
    }
}


export { RecintosZoo as RecintosZoo };
