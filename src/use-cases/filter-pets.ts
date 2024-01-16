import { OrgsRepository } from "@/repositories/org-repository"
import { PetsRepository, QueryField } from "@/repositories/pet-repository"
import { Pet } from "@prisma/client"

interface FilterPetsRequest {
  query: { field: QueryField, value: string }[]
  zipCode: string
  page: number
}

export interface FilterPetsResponse {
  pets: Pet[]
}

export class FilterPets {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) { }

  async execute({
    query,
    zipCode,
    page
  }: FilterPetsRequest) {
    const orgs = await this.orgsRepository.findByZipCode(zipCode);

    if (!orgs) {
      throw new Error('Org not found');
    }

    const pets = await this.petsRepository.searchMany(query, orgs, page)

    return {
      pets,
    }
  }
}