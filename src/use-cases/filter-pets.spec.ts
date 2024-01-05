import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FilterPets } from './filter-pets'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FilterPets

describe('Filter Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FilterPets(petsRepository)
  })

  it.skip('should be able to search for pets by city', async () => {

    const org = await orgsRepository.create({
      adress: 'any_adress',
      cep: '78840000',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      whatsapp_number: 'any_whatsapp_number',
    })

    await petsRepository.create({
      name: 'any_name',
      about: 'any_about',
      age: 'any_age',
      size: 'any_size',
      energy: 'any_energy',
      independency: 'any_independency',
      habitat: 'any_habitat',
      org_id: org.id,
    })

    // const { pets } = await sut.execute({
    //   cep: '78840000',
    //   page: 1,
    // })

    // expect(pets).toHaveLength(1)
    // expect(pets).toEqual([expect.objectContaining({ name: 'any_name' })])
  })

  it.skip('should be able to fetch paginated pet search', async () => {
    const org = await orgsRepository.create({
      adress: 'any_adress',
      cep: '78840000',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      whatsapp_number: 'any_whatsapp_number',
    })

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Pet Name ${i}`,
        about: 'any_about',
        age: 'any_age',
        size: 'any_size',
        energy: 'any_energy',
        independency: 'any_independency',
        habitat: 'any_habitat',
        org_id: org.id,
      })
    }

    // const { pets } = await sut.execute({
    //   cep: '78840000',
    //   page: 2,
    // })

    // expect(pets).toHaveLength(2)
    // expect(pets).toEqual([
    //   expect.objectContaining({ title: 'Pet Name 01' }),
    //   expect.objectContaining({ title: 'Pet Name 22' }),
    // ])
  })
})
