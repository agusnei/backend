class Usuario {
    constructor(nombre, apellido) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = [];
      this.mascotas = [];
    }
    getFullName() {
      return `Nombre de usuario: ${this.nombre} ${this.apellido}`;
    }
    addMascotas(mascota) {
      this.mascotas.push(mascota);
    }
    countMascotas() {
      return this.mascotas.length;
    }
    addBook(libro, autor) {
      this.libros.push({ nombre: libro, autor: autor });
    }
    getBookNames() {
      const listaLibros = [];
      this.libros.map((ll) => listaLibros.push(ll.nombre));
      return listaLibros;
    }
  }
  // declaro usuario
  const usuario = new Usuario("agustin", "neira");
  // retorno nombre de usuario
  console.log(usuario.getFullName());
  // add mascotas al usuario
  usuario.addMascotas("perrito");
  usuario.addMascotas("gatito");
  // cantidad de mascotas existentes
  console.log(`Cantidad de mascotas:`)
  console.log(usuario.countMascotas());
  // agrego 2 libros
  usuario.addBook("don quijote de la mancha", "Miguel de Cervantes");
  usuario.addBook("El código Da Vinci", "Dan Brown");
  // muestro la lista de los nombres de lis libros del usuario
  console.log(usuario.getBookNames());
  // muestra todo de usuario
  console.log(`

  Usuario contiene la siguiente informacion
  
  `);
  console.log(usuario);