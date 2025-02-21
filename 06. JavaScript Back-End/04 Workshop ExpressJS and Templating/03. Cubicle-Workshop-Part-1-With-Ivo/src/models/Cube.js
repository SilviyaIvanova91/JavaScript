const fs = require("fs");
const db = require("../db.json");
const path = require("path");

class Cube {
  constructor(name, description, imageUrl, difficultyLevel) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.difficultyLevel = difficultyLevel;
  }

  save() {
    this.id = db.cubes[db.cubes.length - 1].id + 1;
    db.cubes.push(this);
    const jsonData = JSON.stringify(db, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../db.json"), jsonData);
  }
}

module.exports = Cube;

// const fs = require("fs");
// const db = require("../db.json");
// const path = require("path");

// class Cube {
//   constructor(name, description, imageUrl, difficultyLevel) {
//     this.name = name;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.difficultyLevel = difficultyLevel;
//   }

//   static save(cube) {
//     cube.id = db.cubes[db.cubes.length - 1].id + 1;
//     db.cubes.push(cube);
//     const jsonData = JSON.stringify(db, null, 2);
//     fs.writeFileSync(path.resolve(__dirname, "../db.json"), jsonData);
//   }
// }

// module.exports = Cube;
