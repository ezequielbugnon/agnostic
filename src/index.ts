import * as fs from "fs";

function crearArbolCarpetasConArchivos(
  outputPath: string,
  estructuraCarpetas: Record<string, any>
) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  for (const nombreCarpeta in estructuraCarpetas) {
    const carpetaPath = `${outputPath}/${nombreCarpeta}`;

    if (typeof estructuraCarpetas[nombreCarpeta] === "object") {
      crearArbolCarpetasConArchivos(
        carpetaPath,
        estructuraCarpetas[nombreCarpeta]
      );
    } else if (typeof estructuraCarpetas[nombreCarpeta] === "string") {
      const contenidoArchivo = estructuraCarpetas[nombreCarpeta];
      fs.writeFileSync(`${carpetaPath}`, contenidoArchivo);
    }
  }
}

const outputPath = "./src/output";
const estructuraCarpetas = {
  repository: {
    example: {
      "example.repository.ts": `
      import Database from '../interface.repository';
      
      class UserRepository {
        constructor(private db: Database) {}
      
        async getAllUsers(): Promise<any[]> {
          try {
            this.db.connect();
            const users = await this.db.query('SELECT * FROM users');
            return users;
          } catch (error) {
            throw error;
          } finally {
            this.db.disconnect();
          }
        }
      }
      
      export default UserRepository;`,
      "database.ts": `
      import Database from '../interface.repository';

      const database: Database = {
        connect() {
          // Implementa la lógica de conexión a tu base de datos aquí
        },
        disconnect() {
          // Implementa la lógica de desconexión de tu base de datos aquí
        },
        async query(sql: string, params?: any[]) {
          // Implementa la lógica para realizar consultas a tu base de datos aquí
        },
      };`,
    },
    "interface.repository.ts": `
    interface Database {
      connect(): void;
      disconnect(): void;
      query(sql: string, params?: any[]): Promise<any[]>;
    }
    
    export default Database;`,
  },
  services: {},
  databases: {},
  framewors: {
    example: {
      "example.ts": "console.log()",
    },
  },
  "archivo4.txt": "Contenido del archivo 4",
};

crearArbolCarpetasConArchivos(outputPath, estructuraCarpetas);
