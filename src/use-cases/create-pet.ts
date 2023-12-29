import {  PetsRepository } from "@/repositories/pet-repository"
import { Pet } from "@prisma/client"

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy: string
  independency: string
  habitat: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    name,
    about,
    age,
    size,
    energy,
    independency,
    habitat,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independency,
      habitat,
      org_id
    })

    return { pet }
  }
}