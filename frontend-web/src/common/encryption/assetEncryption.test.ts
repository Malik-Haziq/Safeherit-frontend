import AssetEncryption from "./assetEncryption"
import Encryption from "./encryption"

describe("AssetEncryption", () => {
  const assetEnc = new AssetEncryption()
  const enc = new Encryption()

  it("Adds encryption keys correctly for owner and encrypts sensitive fields.", () => {
    const ownerKeyPair = enc.generateKeyPair() // for owner

    const assetData = {
      category: "Real Estate",
      data: JSON.stringify({ body: "body test" }),
    }

    const encAssetData = assetEnc.encryptAssetData(
      ownerKeyPair.privateKey,
      ownerKeyPair.publicKey,
      assetData,
    )
    expect(encAssetData).toHaveProperty("publicKey")
    expect(encAssetData).toHaveProperty("privateKeyEncByOwner")
    expect(encAssetData).toHaveProperty("data")

    // privateKeyEncByOwner should be encrypted by owner's private key, so
    // it should decrypt.
    const assetPrivateKey = enc.decrypt(
      ownerKeyPair.privateKey,
      encAssetData.privateKeyEncByOwner,
    )
    expect(assetPrivateKey).toBeDefined()

    const decrData = enc.decrypt(assetPrivateKey, encAssetData.data)
    expect(assetData.data).toEqual(decrData) // data should be decrypted
  })

  it("Adds encryption keys correctly for beneficiary and encrypts sensitive fields.", () => {
    const ownerKeyPair = enc.generateKeyPair() // for owner
    const beneficiaryKeyPair = enc.generateKeyPair() // for beneficiary

    const assetData = {
      category: "Real Estate",
      data: JSON.stringify({ body: "body test" }),
      assignedBeneficiaryIds: ["1"],
      beneficirayPublicKeys: {"1": {public_key: beneficiaryKeyPair.publicKey}},
    }

    const encAssetData = assetEnc.encryptAssetData(
      ownerKeyPair.privateKey,
      ownerKeyPair.publicKey,
      assetData,
    )
    expect(encAssetData).toHaveProperty("publicKey")
    expect(encAssetData).toHaveProperty("privateKeyEncByOwner")
    expect(encAssetData).toHaveProperty("privateKeysEncByBeneficiary")
    expect(encAssetData).toHaveProperty("data")
    expect(encAssetData).toHaveProperty("assignedBeneficiaryIds")

    // privateKeyEncByBeneficiary should be encrypted by beneficiary's public
    // key, so it should decrypt.
    const assetPrivateKey = enc.decrypt(
      beneficiaryKeyPair.privateKey,
      encAssetData.privateKeysEncByBeneficiary['1'],
    )
    expect(assetPrivateKey).toBeDefined()

    const decrData = enc.decrypt(assetPrivateKey, encAssetData.data)
    expect(assetData.data).toEqual(decrData) // data should be decrypted
  })

  it("Decrypts asset data for owner.", () => {
    const ownerKeyPair = enc.generateKeyPair() // for owner

    const assetData = {
      category: "Real Estate",
      data: "body test",
    }

    const encAssetData = assetEnc.encryptAssetData(
      ownerKeyPair.privateKey,
      ownerKeyPair.publicKey,
      assetData,
    )

    const decrData = assetEnc.decryptAssetDataForOwner(
      ownerKeyPair.privateKey,
      encAssetData,
    )
    expect(assetData).toEqual(decrData) // data should be decrypted
  })

  it("Decrypts asset data for beneficiary.", () => {
    const ownerKeyPair = enc.generateKeyPair() // for owner
    const beneficiaryKeyPair = enc.generateKeyPair() // for beneficiary

    const assetData = {
      category: "Real Estate",
      data: JSON.stringify({ body: "body test" }),
      assignedBeneficiaryIds: ["1"],
      beneficirayPublicKeys: {"1": {public_key: beneficiaryKeyPair.publicKey}},
    }

    const encAssetData = assetEnc.encryptAssetData(
      ownerKeyPair.privateKey,
      ownerKeyPair.publicKey,
      assetData,
    )

    const decrData = assetEnc.decryptAssetDataForBeneficiary(
      beneficiaryKeyPair.privateKey,
      '1',
      encAssetData,
    )
    expect(assetData).toEqual(decrData) // data should be decrypted
  })
})
