import { Pet, Prisma } from "@prisma/client";

export type QueryField = 'name' | 'age' | 'energy' | 'independency' | 'habitat' | 'org_id';

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  searchMany(query: { field: QueryField, value: string }[], page: number): Promise<Pet[]>
}