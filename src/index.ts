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
      
      class Repository {
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
      
      export default Repository;`,
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
  services: {
    example:{
      'example.service.ts': `
      import Repository from "../repository/example/example.repository";

      class Service {
        constructor(private readonly repository: Repository) {}
      
        async getSomething(): Promise<any[]> {
          try {
           return []
          } catch (error) {
            throw error;
          }
        }
      }
      
      export default Service;
      ` 
    }
  },
  controllers:{
    'example.controllers.ts': `// Define una interfaz genérica para el controlador
    interface GenericController<ReqType, ResType> {
      handleRequest(req: ReqType, res: ResType): void;
    }
    
    // Define los tipos de solicitud y respuesta para Express
    import { Request, Response } from 'express';
    
    // Implementa un controlador específico para Express
    class ExpressController implements GenericController<Request, Response> {
      handleRequest(req: Request, res: Response) {
        // Lógica específica de Express
        res.send('Hello from Express!');
      }
    }
    
    // Define los tipos de solicitud y respuesta para Koa
    import { Context } from 'koa';
    
    // Implementa un controlador específico para Koa
    class KoaController implements GenericController<Context, void> {
      async handleRequest(ctx: Context) {
        // Lógica específica de Koa
        ctx.body = 'Hello from Koa!';
      }
    }
    
    // Define los tipos de solicitud y respuesta para Fastify
    import { FastifyRequest, FastifyReply } from 'fastify';
    
    // Implementa un controlador específico para Fastify
    class FastifyController implements GenericController<FastifyRequest, FastifyReply> {
      async handleRequest(req: FastifyRequest, res: FastifyReply) {
        // Lógica específica de Fastify
        res.send('Hello from Fastify!');
      }
    }
    `
  },
  framewors: {
    example: {
      "example.ts": "console.log()",
    },
  },
  "archivo4.txt": "Contenido del archivo 4",
};

crearArbolCarpetasConArchivos(outputPath, estructuraCarpetas);
