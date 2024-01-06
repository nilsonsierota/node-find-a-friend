import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FindOrgByZipCode } from './find-org-by-zip-code'

let orgsRepository: InMemoryOrgsRepository
let sut: FindOrgByZipCode

describe('FindOrgByZipCode Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindOrgByZipCode(orgsRepository)
  })

  it('should be able to search for orgs by zip Code', async () => {
    await orgsRepository.create({
      adress: 'any_adress',
      cep: '78840000',
      email: 'johndoe@example.com',
      name: 'Org 1',
      password_hash: await hash('123456', 6),
      whatsapp_number: 'any_whatsapp_number',
    })

    await orgsRepository.create({
      adress: 'any_adress',
      cep: 'any_cep',
      email: 'johndoe@example.com',
      name: 'Org 2',
      password_hash: await hash('123456', 6),
      whatsapp_number: 'any_whatsapp_number',
    })

    const { orgs } = await sut.execute({
      zipCode: '78840000',
    })

    expect(orgs).toHaveLength(1)
    expect(orgs).toEqual([expect.objectContaining({ name: 'Org 1' })])
  })
})
