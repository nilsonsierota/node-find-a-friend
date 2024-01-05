import { PetsRepository } from "@/repositories/pet-repository"
import { Pet } from "@prisma/client"

interface FilterCityPetsRequest {
  cep: string
  page: number
}

export interface FilterCityPetsResponse {
  pets: Pet[]
}

export class FilterCityPets {
  constructor(
    private petsRepository: PetsRepository,
  ) { }

  async execute({
    cep,
    page
  }: FilterCityPetsRequest) {
    const pets = await this.petsRepository.searchMany(cep, page)

    return {
      pets,
    }
  }
}