import * as forge from "node-forge"

class Encryption {
  /**
   * Encryption scheme to use with common encryption methods.
   * We are using hybrid encryption with RSA and AES.
   */
  private rsaEncryptionScheme: forge.pki.rsa.EncryptionScheme = "RSA-OAEP"
  private aesEncryptionScheme: forge.cipher.Algorithm = "AES-CBC"
  private delimiter = "-"
  private getIV = (text: string) => forge.util.createBuffer(text).getBytes()

  public encrypt(publicKey: string, data: string | Buffer): string {
    // Generate a random AES key and IV as byte arrays
    const aesKey = forge.random.getBytesSync(32)
    const aesIv = forge.random.getBytesSync(16)

    // Encrypt the data with AES
    const cipher = forge.cipher.createCipher(this.aesEncryptionScheme, aesKey)
    cipher.start({ iv: aesIv })
    cipher.update(forge.util.createBuffer(data))
    cipher.finish()
    const encryptedData = cipher.output.getBytes()

    // Encrypt the AES key with RSA
    const publicKeyPem = forge.pki.publicKeyFromPem(publicKey)
    const encryptedAesKey = publicKeyPem.encrypt(
      aesKey,
      this.rsaEncryptionScheme,
      {
        md: forge.md.sha256.create(),
      },
    )

    // Combine the encrypted AES key and IV with the encrypted data
    const combinedData =
      forge.util.encode64(encryptedAesKey) +
      this.delimiter +
      forge.util.encode64(aesIv) +
      this.delimiter +
      forge.util.encode64(encryptedData)
    return combinedData
  }

  public decrypt(privateKey: string, encryptedData: string): string {
    // Split the encrypted data into parts
    const parts = encryptedData.split(this.delimiter)
    if (parts.length !== 3) {
      throw new Error("Invalid encrypted data format")
    }
    const encryptedAesKey = forge.util.decode64(parts[0])
    const aesIv = forge.util.decode64(parts[1])
    const encryptedDataBytes = forge.util.decode64(parts[2])

    // Decrypt the AES key with RSA
    const privateKeyPem = forge.pki.privateKeyFromPem(privateKey)
    const aesKey = privateKeyPem.decrypt(
      encryptedAesKey,
      this.rsaEncryptionScheme,
      {
        md: forge.md.sha256.create(),
      },
    )

    // Decrypt the data with AES
    const decipher = forge.cipher.createDecipher(
      this.aesEncryptionScheme,
      aesKey,
    )
    decipher.start({ iv: aesIv })
    decipher.update(forge.util.createBuffer(encryptedDataBytes))
    decipher.finish()

    // convert bytes to string
    const decryptedData = decipher.output.getBytes().toString()
    return decryptedData
  }

  public encryptKeys(data: string, uid: string) {
    const key = forge.md.sha256.create().update(uid).digest().getBytes()
    const iv = this.getIV(uid)

    const cipher = forge.cipher.createCipher("AES-CBC", key)
    cipher.start({ iv: iv })
    cipher.update(forge.util.createBuffer(data, "utf8"))
    cipher.finish()

    const encrypted = forge.util.encode64(cipher.output.getBytes())
    return encrypted
  }

  public decryptKeys(encryptedData: string, uid: string) {
    const key = forge.md.sha256.create().update(uid).digest().getBytes()
    const iv = this.getIV(uid)

    const decipher = forge.cipher.createDecipher("AES-CBC", key)
    decipher.start({ iv: iv })
    decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedData)))
    decipher.finish()

    const decryptedString = decipher.output.toString()
    return decryptedString
  }

  public generateKeyPair(): {
    publicKey: string
    privateKey: string
  } {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 })
    const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey)
    const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey)
    return {
      publicKey,
      privateKey,
    }
  }

  public validateKeyPair(publicKey: string, privateKey: string): boolean {
    try {
      const data = "Hello World"
      const encrypted = this.encrypt(publicKey, data)
      const decrypted = this.decrypt(privateKey, encrypted)
      return data === decrypted
    } catch (error) {
      return false
    }
  }
}

export default Encryption
