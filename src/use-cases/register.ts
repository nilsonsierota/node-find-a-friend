import { OrgsRepository } from "@/repositories/org-repository"
import { Org } from "@prisma/client"
import { hash } from "bcryptjs"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  adress: string
  cep: string
  whatsapp_number: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({
    email,
    name,
    password,
    adress,
    cep,
    whatsapp_number
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      adress,
      cep,
      whatsapp_number
    })

    return {
      org,
    }
  }
}