const AbstractRepository = require("./AbstractRepository");

class MenuRepository extends AbstractRepository {
  constructor() {
  
    super({ table: "menu" });
  }


  async create(menu) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (continent, country) VALUES (?, ?)`,
      [menu.continent, menu.country]
    );

    return result.insertId;
  }


  async update(menu) {
    const id = parseInt(menu.id, 10);
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET country = ? WHERE id = ?`,
      [menu.country, id]
    );

    return result;
  }


  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async readByContinent(continent) {
 
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE continent = ?`,
      [continent]
    );

 
    return rows;
  }
}

module.exports = MenuRepository;
