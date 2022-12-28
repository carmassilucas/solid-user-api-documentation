import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    if (!email || !name) {
      throw new Error("Unprocessable Entity");
    }

    const userAlteradyExists = this.usersRepository.findByEmail(email);

    if (userAlteradyExists) {
      throw new Error("User already exists");
    }

    const user = this.usersRepository.create({ name, email });

    return user;
  }
}

export { CreateUserUseCase };
