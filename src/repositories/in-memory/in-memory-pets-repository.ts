import { Org, Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetsRepository, QueryField } from "../pet-repository";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  public orgsRepository = new InMemoryOrgsRepository();

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id);

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(query: { field: QueryField, value: string }[], orgs: Org[], page: number) {
    return this.items
      .filter((item) => orgs.every((org) => org.id === item.org_id) && query.every(query => item[query.field].includes(query.value)))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      habitat: data.habitat,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}