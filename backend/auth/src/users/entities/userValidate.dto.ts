import { Exclude, Expose } from "class-transformer";
import { IdTransform } from "src/app/lib/id.transform";
import { UserEntity } from "./user.entity";

export class UserValidateEntity extends IdTransform {
    name?: {
        first: string;
        last: string;
      };
    
      @Exclude()
      password: string;
    
      @Exclude()
      refreshToken: string;
    
      @Expose()
      get fullName(): string {
        if (!this.name) return undefined;
        return `${this.name.first} ${this.name.last}`;
      }

      @Exclude()
      status: string
    
      constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
      }
}