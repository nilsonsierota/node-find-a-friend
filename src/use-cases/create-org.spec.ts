import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { describe, beforeEach, it, expect } from "vitest"
import { CreateOrgUseCase } from "./create-org"

let OrgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    OrgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(OrgsRepository)
  })

  it('should to create Org', async () => {
    const { org } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      cep: 'any_cep',
      adress: 'any_adress',
      whatsapp_number: 'any_whatsapp_number',
      password_hash: 'any_password_hash'
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
