import { Org, Pet, Prisma } from "@prisma/client";

export type QueryField = 'name' | 'age' | 'energy' | 'independency' | 'habitat' | 'size';

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  searchMany(query: { field: QueryField, value: string }[], orgs_id: Org[], page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>;
}