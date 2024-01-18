import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPet } from './get-pet'

let petsRepository: InMemoryPetsRepository
let sut: GetPet

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPet(petsRepository)
  })

  it('should be able to get pet by id', async () => {
    await petsRepository.create({
      id: '1',
      name: 'Pet 1',
      about: 'any_about',
      age: '1',
      size: 'any_size',
      energy: 'any_energy',
      independency: 'any_independency',
      habitat: 'any_habitat',
      org_id: 'any_org'
    })

    const { pet } = await sut.execute({
      pet_id: '1'
    })

    expect(pet).toEqual(expect.objectContaining({ name: 'Pet 1' }))
  })
})
