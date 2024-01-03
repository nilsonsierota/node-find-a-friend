import { OrgsRepository } from "@/repositories/org-repository"
import { PetsRepository } from "@/repositories/pet-repository"
import { Pet } from "@prisma/client"

interface FilterPetsRequest {
  cep: string
  page: number
}

export interface FilterPetsResponse {
  pets: Pet[]
}

export class FilterPets {
  constructor(
    private petsRepository: PetsRepository,
  ) { }

  async execute({
    cep,
    page
  }: FilterPetsRequest) {
    const pets = await this.petsRepository.searchMany(cep, page)

    return {
      pets,
    }
  }
}