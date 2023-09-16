
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
      
      export default Repository;