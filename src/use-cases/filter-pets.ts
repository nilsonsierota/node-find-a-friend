import { PetsRepository } from "@/repositories/pet-repository"
import { Pet } from "@prisma/client"

interface FilterPetsRequest {
  query: string
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
    query,
    page
  }: FilterPetsRequest) {
    const pets = await this.petsRepository.searchMany(query, page)

    return {
      pets,
    }
  }
}