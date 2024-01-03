import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../org-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      adress: data.adress,
      whatsapp_number: data.whatsapp_number,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find(org => org.email === email)

    if (!org) {
      return null
    }

    return org
  }
}