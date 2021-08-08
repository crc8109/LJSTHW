const readline = require('readline-sync');

class Game {
  constructor () {
    this.hp = Math.floor(Math.random() * 10) + 1;
  }

  say(prompt) {
      console.log(prompt);
  }

  die(message) {
      this.say(message);
      process.exit(1);
  }

  ask(prompt) {
      console.log(`[[You have ${this.hp} hit points.]]`);
      if(this.hp <= 0) {
          this.die("You died!");
      } else {
          return readline.question(prompt + ' ');
      }
  }

  addRoom(room) {
    this[room.name] = room;
    room.game = this;
  }

  play(name) {
    this[name].enter();
  }

  hit(amount) {
    this.hp -= amount;
  }
}

class Room {
  constructor (name) {
    this.name = name;
  }

  enter() {
    console.log("implement me!");
  }
}

class Door extends Room {
    enter() {
      // they have to open the door to get the gold
      // what kind of puzzle will they solve?
    }
}

class Spider extends Room {
  enter() {
    // they enter here, and the spider takes 10 hit points
    // if they live then they can run away
  }
}

class Gold extends Room {
  enter() {
    this.game.say("\nYou found the gold!");
    this.game.say("Congratulations, you win!");
  }
}

class Rope extends Room {
  enter() {
    this.game.say("You are at the bottom of the well now.");
    this.game.say("You can choose that door which probably leads to gold.");
    this.game.say("Or you can go choose that tunnel and see a giant spider.");

    let choice = this.game.ask("\nWhat do you want to do?");

    if (choice === "door") {
      this.game.say("\nYou decide to walk through the door.");
      this.game.gold.enter();
    } else if(choice === "spider") {
        this.game.say("\nYikes! Let's see if you survive!");
        this.game.hit(10);
        this.game.rope.enter();
    } else {
        this.game.say("\nYou can't do that here.\n");
        this.game.rope.enter();
    }
  }
}

class Well extends Room {

  enter() {
    this.game.say("You are walking through the woods and see a well.");
    this.game.say("Walking up to it and looking down you see a shiny thing at the bottom.");
    let next = this.game.ask("What do you do?");

    if(next === "climb") {
        this.game.say("\nYou climb down the rope.");
        this.game.rope.enter();
    } else if(next === "jump") {
        this.game.say("\nYikes! Let's see if you survive!");
        this.game.hit(5);
        this.game.rope.enter();
    } else {
        this.game.say("\nYou can't do that here.\n");
        this.game.well.enter();
    }
  }
}


let game = new Game();
game.addRoom(new Well("well"));
game.addRoom(new Rope("rope"));
game.addRoom(new Gold("gold"));
game.addRoom(new Spider("spider"));
game.addRoom(new Door("door"));
game.play("well");
