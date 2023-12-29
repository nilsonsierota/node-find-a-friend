import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetsRepository } from "../pet-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: any[] = []

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