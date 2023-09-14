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