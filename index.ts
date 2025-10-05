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
}

class Sword implements Weapon {
    damage: number = 20;
    attack(): number {
        const chance = Math.random();
        if (chance <= 0.25) {
            return this.damage * 2;
        }
        return this.damage;
    }
}

class Spear implements Weapon {
    damage: number = 15;
    attack(): number {
        return this.damage;
    }
}

class Axe implements Weapon {
    rageDamage: number = 0;
    rageBonus: number = 2;
    damage: number = 25;
    attack(): number {
        const totalDamage = this.damage + this.rageDamage;
        this.rageDamage += this.rageBonus;
        return totalDamage;
    }
}

class Gladiator {
    constructor(public name: string, public health: number, public weapon: Weapon) {}

    attack(target: Gladiator): void {
        const damage = this.weapon.attack();
        target.takeDamage(damage);
    }

    takeDamage(damage: number): void {
        this.health -= damage;
        console.log(`${this.name} получил ${damage} урона. Осталось ${this.health}`);
    }

    isDead(): boolean {
        return this.health <= 0;
    }

    showStats(): void {
        const weaponName = this.weapon.constructor.name;
        console.log(`Имя: ${this.name}, Здоровье: ${this.health}, Оружие: ${weaponName}`);
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

let group: Gladiator[] = [];

function populateGroup(count: number) {
    for (let i = 0; i < count; i++) {
        const gladiator = new Gladiator(getRandomName(), 100, getRandomWeapon());
        group.push(gladiator);
    }
}

populateGroup(6);
group.forEach(gladiator => gladiator.showStats());




