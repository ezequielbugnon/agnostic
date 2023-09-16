// Define una interfaz genérica para el controlador
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
    