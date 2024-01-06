import { OrgsRepository } from "@/repositories/org-repository"
import { Org } from "@prisma/client"

interface FindOrgByZipCodeRequest {
  zipCode: string
}

export interface FindOrgByZipCodeResponse {
  orgs: Org | null
}

export class FindOrgByZipCode {
  constructor(
    private orgsRepository: OrgsRepository,
  ) { }

  async execute({
    zipCode
  }: FindOrgByZipCodeRequest) {
    const orgs = await this.orgsRepository.findByZipCode(zipCode)

    return {
      orgs,
    }
  }
}