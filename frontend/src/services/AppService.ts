import { ApiService } from "./ApiService";

export class AppService extends ApiService {
  public getTest = () => this.get("/test");
  public postTest = (body: BodyInit) => this.post("/test", body);
  public putTest = (body: BodyInit) => this.put("/test", body);
  public deleteTest = () => this.delete("/test");
}
