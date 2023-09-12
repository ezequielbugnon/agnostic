
    interface Database {
      connect(): void;
      disconnect(): void;
      query(sql: string, params?: any[]): Promise<any[]>;
    }
    
    export default Database;