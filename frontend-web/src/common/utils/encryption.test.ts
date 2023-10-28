import Encryption from "./encryption"

describe("Encryption", () => {
  const encryption = new Encryption()

  it("should generate private and public key pair.", () => {
    const { publicKey, privateKey } = encryption.generateKeyPair()
    expect(publicKey).toBeDefined()
    expect(privateKey).toBeDefined()
    expect(publicKey).toContain("-----BEGIN PUBLIC KEY-----")
    expect(privateKey).toContain("-----BEGIN RSA PRIVATE KEY-----")
  })

  it("should validate the key pair.", () => {
    const { publicKey, privateKey } = encryption.generateKeyPair()
    expect(encryption.validateKeyPair(publicKey, privateKey)).toBe(true)
  })

  it("should encrypt and decrypt data.", () => {
    const { publicKey, privateKey } = encryption.generateKeyPair()
    const data = "Hello World"
    const encrypted = encryption.encrypt(publicKey, data)
    const decrypted = encryption.decrypt(privateKey, encrypted)
    expect(data).toEqual(decrypted)
  })
})
