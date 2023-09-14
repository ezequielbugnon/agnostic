
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
      };