import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetsRepository, QueryField } from "../pet-repository";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  public orgsRepository = new InMemoryOrgsRepository();

  async searchMany(query: { field: QueryField, value: string }[], page: number) {
    return this.items
      .filter((item) => query.every(query => item[query.field].includes(query.value)))
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