import { describe, beforeEach, it, expect } from "vitest"
import { CreatePetUseCase } from "./create-pet"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should to create pet', async () => {
    const { pet } = await sut.execute({
      name: 'any_name',
      about: 'any_about',
      age: 'any_age',
      size: 'any_size',
      energy: 'any_energy',
      independency: 'any_independency',
      habitat: 'any_habitat',
      org_id: 'any_org_id'
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
