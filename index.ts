interface Weapon{
    damage: number;
    attack(): number
    
    
}
class Sword implements Weapon{
    damage: number = 20;
    attack(): number {
        const chance = Math.random()
        if (chance <= 0.25){
            return this.damage * 2
        }
        return this.damage
    }

}

class Gladiator{

    constructor(public name: string, public health: number, public weapon: Weapon){

    }
    attack(target: Gladiator): void{
        const damage = this.weapon.attack()
        target.takeDamage(damage)
    }
    takeDamage(damage: number): void{
        this.health -= damage
        console.log(`${this.name} получил ${damage} урона. осталось ${this.health} `)
    }
    isDead(): boolean{
        return this.health <= 0
    }
}
const gradiator1 = new Gladiator("Василий", 100,new Sword())
const gladiator2 = new Gladiator("Николай", 100,new Sword())
gradiator1.attack(gladiator2)
gladiator2.attack(gradiator1)
