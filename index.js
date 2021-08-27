//Imports de los módulos
const fs = require("fs/promises");
const path = require("path");

const checkFile = path.resolve("hello.txt");
const users = path.resolve("users.json");

const readFileUsers = () => {
  //Imprimir en consola el arreglo de usuarios
  //Promise
  /*   fs.readFile(checkFile, "utf-8")
    .then((data) => console.log(data))
    .catch((error) => console.log(error)); */

  //Async-Await
  (async () => {
    try {
      const data = await fs.readFile(users, "utf8");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  })();
};

const writeHelloWorld = () => {
  //Escribir hello world! en el archivo hello.txt
  fs.writeFile(checkFile, "hello world!", (error) =>
    error
      ? console.log("Error al escribir")
      : console.log("Se escribió correctamente")
  );
};

const addUser = (username) => {
  //Agregar un usuario en la lista users.json
  let arr = [];

  const readInfo = async () => {
    try {
      const data = await fs.readFile(users, "utf8");
      arr = await JSON.parse(data);
      arr = [...arr, username];
    } catch (error) {
      console.log(error);
    }
  };

  readInfo();

  (async () => {
    try {
      await fs.writeFile(users, JSON.stringify(arr));
    } catch (error) {
      console.log(error);
    }
  })();
};

["Hector", "Eduardo", "Sandra", "Ana", "Saúl"];

//No hace falta ejecutar las funciones
console.log(addUser("Pedro"));

module.exports = {
  readFileUsers,
  writeHelloWorld,
  addUser,
};
