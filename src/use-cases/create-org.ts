import { OrgsRepository } from "@/repositories/org-repository"
import { Org } from "@prisma/client"

interface CreateOrgUseCaseRequest {
  name: string;
  email: string;
  cep: string;
  adress: string;
  whatsapp_number: string;
  password_hash: string;
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) { }
  async execute({
    name,
    email,
    cep,
    adress,
    whatsapp_number,
    password_hash
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await this.orgsRepository.create({
      name,
      email,
      cep,
      adress,
      whatsapp_number,
      password_hash
    })

    return { org }
  }
}