function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName(): string {
    const names: string[] = ['Василий', 'Николай', 'Роберт', 'Роман', 'Артем', 'Кирилл', 'Евгений', 'Александр', 'Максим', 'Павел', 'Руслан'];
    const randomIndex = getRandomNumber(0, names.length - 1);
    return names[randomIndex]!;
}

interface Weapon {
    damage: number;
    attack(): number;
    getName(): string;
}

class Sword implements Weapon {
    damage: number = 20;
    
    attack(): number {
        const chance = Math.random();
        if (chance <= 0.25) {
            console.log('  (Критический удар!)');
            return this.damage * 2;
        }
        return this.damage;
    }
    
    getName(): string {
        return 'Меч';
    }
}

class Spear implements Weapon {
    damage: number = 15;
    
    attack(): number {
        return this.damage;
    }
    
    getName(): string {
        return 'Копье';
    }
}

class Axe implements Weapon {
    rageDamage: number = 0;
    rageBonus: number = 2;
    damage: number = 12;
    
    attack(): number {
        const totalDamage = this.damage + this.rageDamage;
        this.rageDamage += this.rageBonus;
        return totalDamage;
    }
    
    getName(): string {
        return 'Топор';
    }
}

class Gladiator {
    constructor(public name: string, public health: number, public weapon: Weapon) {}

    attack(target: Gladiator): number {
        const damage = this.weapon.attack();
        target.takeDamage(damage);
        return damage;
    }

    takeDamage(damage: number): void {
        this.health -= damage;
    }

    isDead(): boolean {
        return this.health <= 0;
    }

    showStats(): void {
        console.log(`- ${this.name} (Здоровье: ${this.health}, Оружие: ${this.weapon.getName()})`);
    }
    
    getInfo(): string {
        return `${this.name} (${this.weapon.getName()})`;
    }
}

function getRandomWeapon(): Weapon {
    const random = Math.floor(Math.random() * 3);
    if (random === 0) {
        return new Sword();
    } else if (random === 1) {
        return new Spear();
    } else {
        return new Axe();
    }
}

class Arena {
    gladiators: Gladiator[];

    constructor(gladiators: Gladiator[]) {
        this.gladiators = gladiators;
    }

    start(): void {
        console.log('Турнир начинается!\n');
        console.log('Участники:');
        this.gladiators.forEach(gladiator => gladiator.showStats());
        console.log('');
        
        this.runTournament();
    }

    runTournament(): void {
        let participants = [...this.gladiators];
        let battleNumber = 1;

        while (participants.length > 1) {
            const newParticipants: Gladiator[] = [];

            for (let i = 0; i < participants.length; i += 2) {
                if (i + 1 < participants.length) {
                    const fighter1 = participants[i];
                    const fighter2 = participants[i + 1];
                    
                    console.log(`--- Бой ${battleNumber} ---`);
                    const winner = this.battle(fighter1, fighter2);
                    newParticipants.push(winner);
                    console.log('');
                    battleNumber++;
                } else {
                    newParticipants.push(participants[i]);
                }
            }

            participants = newParticipants;
        }

        this.announceChampion(participants[0]);
    }

    battle(fighter1: Gladiator, fighter2: Gladiator): Gladiator {
        console.log(`${fighter1.getInfo()} против ${fighter2.getInfo()}\n`);

        while (!fighter1.isDead() && !fighter2.isDead()) {
            // Ход первого бойца
            const damage1 = fighter1.attack(fighter2);
            console.log(`  ${fighter1.name} наносит ${damage1} урона ${fighter2.name}!`);
            
            if (fighter2.isDead()) {
                console.log(`\n${fighter2.name} побежден!`);
                return fighter1;
            }

            // Ход второго бойца
            const damage2 = fighter2.attack(fighter1);
            console.log(`  ${fighter2.name} наносит ${damage2} урона ${fighter1.name}!`);
            
            if (fighter1.isDead()) {
                console.log(`\n${fighter1.name} побежден!`);
                return fighter2;
            }
        }

        return fighter1.isDead() ? fighter2 : fighter1;
    }

    announceChampion(champion: Gladiator): void {
        console.log('Император приветствует победителя!');
        console.log(`Чемпион арены: ${champion.name} (Здоровье: ${champion.health}, Оружие: ${champion.weapon.getName()})`);
    }
}

let group: Gladiator[] = [];

function populateGroup(count: number) {
    for (let i = 0; i < count; i++) {
        const gladiator = new Gladiator(getRandomName(), 100, getRandomWeapon());
        group.push(gladiator);
    }
}
// Создание гладиаторов и запуск турнира
populateGroup(6);
const arena = new Arena(group);
arena.start();
