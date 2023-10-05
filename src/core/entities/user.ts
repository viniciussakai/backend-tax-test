import { Entity } from "./entity";
import { Investment } from "./investments";

interface UserProps {
  name: string;
  email: string;

  investments?: Investment[];
}

class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  get investments(): Investment[] {
    return this.props.investments || [];
  }

  static create(props: UserProps, id?: string): User {
    const user = new User(props, id);

    if (!props.investments) {
      user.props.investments = [];
    }

    return user;
  }
}

export { User };
