import { Beneficiary } from "./users.type"

export interface Asset {
  assignedBeneficiaryIds: string[]
  data: any
  privateKeysEncByBeneficiary: { [key: string]: string }
  id: string
  category: string
  privateKeyEncByOwner: string
  beneficiaries: Beneficiary[]
  asset_file: string
}