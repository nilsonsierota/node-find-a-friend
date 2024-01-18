import { PetsRepository } from "@/repositories/pet-repository"
import { Pet } from "@prisma/client"

interface GetPetRequest {
  pet_id: string
}

export interface GetPetResponse {
  pet: Pet
}

export class GetPet {
  constructor(
    private petsRepository: PetsRepository,
  ) { }

  async execute({
    pet_id
  }: GetPetRequest) {
    const pet = await this.petsRepository.findById(pet_id)

    return {
      pet,
    }
  }
}