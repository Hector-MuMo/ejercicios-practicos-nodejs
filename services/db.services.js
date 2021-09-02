import fs from "fs/promises";
import path from "path";
import faker from "faker";
import { readFile } from "fs";

class AcademloDb {
  static dbPath = path.resolve("db", "db.json");

  static findAll = async () => {
    try {
      let data = await fs.readFile(this.dbPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(
        "Hubo un error al tratar de obtener todos los registros de la DB"
      );
    }
  };

  static findById = async (id) => {
    try {
      let users = await this.findAll(),
        userRequired = users.find((user) => user.id === id);
      return userRequired;
    } catch (error) {
      throw new Error("Hubo un error al tratar de obtener el ID de la DB");
    }
  };

  static create = async (obj) => {
    try {
      let data = await fs.readFile(this.dbPath, "utf8"),
        users = JSON.parse(data);
      users.push(obj);
      await fs.writeFile(this.dbPath, JSON.stringify(users));
      let index = users.length - 1;
      return users[index];
    } catch (error) {
      throw new Error(`Hubo un error al crear el usuario - ${error}`);
    }
  };

  static update = async (obj, id) => {
    try {
      let users = await this.findAll();
      let index = users.findIndex((user) => user.id === id);

      if (index !== -1) {
        users[index] = obj;
        return obj;
      } else {
        return `El usuario con el id ${id} no existe `;
      }
    } catch (error) {
      throw new Error(`Hubo un error al actualizar el usuario - ${error}`);
    }
  };

  static delete = async (id) => {
    try {
      let users = await this.findAll();
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          users.splice(i, 1);
          return true;
        }
      }

      return false;
    } catch (error) {
      throw new Error("Hubo un error al eliminar el usuario");
    }
  };

  static clear = async () => {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify([]));
    } catch (error) {
      throw new Error("Hubo un error al tratar de vaciar la DB");
    }
  };

  static populateDB = async (size) => {
    let userArr = [];
    for (let i = 0; i < size; i++) {
      let userObj = {
        id: i + 1,
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
      };

      userArr.push(userObj);
    }

    try {
      await fs.writeFile(this.dbPath, JSON.stringify(userArr));
      return userArr;
    } catch (error) {
      throw new Error("Hubo un error al insertar en la base de datos");
    }
  };
}

export default AcademloDb;
