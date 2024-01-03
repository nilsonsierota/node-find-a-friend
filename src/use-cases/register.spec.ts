import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let OrgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase
describe('Register Org Use Case', () => {
  beforeEach(() => {
    OrgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(OrgsRepository)
  })

  it('should to register', async () => {
    const { org } = await sut.execute({
      adress: 'any_adress',
      cep: 'any_cep',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      whatsapp_number: 'any_whatsapp_number',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      adress: 'any_adress',
      cep: 'any_cep',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      whatsapp_number: 'any_whatsapp_number',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      adress: 'any_adress',
      cep: 'any_cep',
      email,
      name: 'John Doe',
      password: '123456',
      whatsapp_number: 'any_whatsapp_number',
    })

    await expect(() =>
      sut.execute({
        adress: 'any_adress',
        cep: 'any_cep',
        email,
        name: 'John Doe',
        password: '123456',
        whatsapp_number: 'any_whatsapp_number',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
