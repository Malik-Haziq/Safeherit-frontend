import Encryption from "./encryption"

class AssetEncryption {
  private encryption: Encryption

  constructor() {
    this.encryption = new Encryption()
  }

  public encryptAssetData(
    ownerPrivateKey: string,
    ownerPublicKey: string,
    data: any,
  ): any {
    /**
     * Expects the data to contain assignedBeneficiaryPublicKey along
     * with all assets fields.
     */
    data = JSON.parse(JSON.stringify(data)) // deep copy

    let assetPrivateKey: string
    if (!data.publicKey) {
      const { publicKey, privateKey } = this.encryption.generateKeyPair()
      data.publicKey = publicKey
      assetPrivateKey = privateKey
    } else {
      // we can assume that if there is a publicKey, there is also
      // privateKeyEncByOwner.
      assetPrivateKey = this.encryption.decrypt(
        ownerPrivateKey,
        data.privateKeyEncByOwner,
      )
    }

    // Add encrypted keys for beneficiary and owner in asset data.
    data.privateKeyEncByOwner = this.encryption.encrypt(
      ownerPublicKey,
      assetPrivateKey,
    )

    if (data.assignedBeneficiaryIds?.length > 0) {
      data.privateKeysEncByBeneficiary = {}

      data.assignedBeneficiaryIds.forEach((id: string) => {
        const beneficiaryPublicKey = data.beneficirayPublicKeys[id].public_key
        data.privateKeysEncByBeneficiary[id] = this.encryption.encrypt(
          beneficiaryPublicKey,
          assetPrivateKey,
        )
      })
    }

    // encrypt the sensitive fields in the asset data
    data.data = this.encryption.encrypt(data.publicKey, data.data)
    return data
  }

  public decryptAssetDataForOwner(ownerPrivateKey: string, data: any): any {
    data = JSON.parse(JSON.stringify(data)) // deep copy
    const assetPrivateKey = this.encryption.decrypt(
      ownerPrivateKey,
      data.privateKeyEncByOwner,
    )

    // delete all fields related to encryption
    // delete data.privateKeyEncByOwner
    delete data.privateKeyEncByBeneficiary
    delete data.publicKey

    // decrypt the sensitive fields in the asset data
    data.data = this.encryption.decrypt(assetPrivateKey, data.data)
    return data
  }

  public decryptAssetDataForBeneficiary(
    beneficiaryPrivateKey: string,
    beneficiaryId: string,
    data: any,
  ): any {
    data = JSON.parse(JSON.stringify(data)) // deep copy
    const assetPrivateKey = this.encryption.decrypt(
      beneficiaryPrivateKey,
      data.privateKeysEncByBeneficiary[beneficiaryId],
    )

    // delete all fields related to encryption
    delete data.privateKeyEncByOwner
    delete data.privateKeysEncByBeneficiary
    delete data.publicKey

    // decrypt the sensitive fields in the asset data
    data.data = this.encryption.decrypt(assetPrivateKey, data.data)
    return data
  }
}

export default AssetEncryption
