import * as forge from "node-forge"

class Encryption {
  private encryptionScheme: forge.pki.rsa.EncryptionScheme = "RSA-OAEP"

  public encrypt(publicKey: string, data: string | Buffer): string {
    const publicKeyPem = forge.pki.publicKeyFromPem(publicKey)
    const encrypted = publicKeyPem.encrypt(
      data.toString(),
      this.encryptionScheme,
      {
        md: forge.md.sha256.create(),
      },
    )
    return forge.util.encode64(encrypted)
  }

  public decrypt(privateKey: string, encryptedData: string): string | Buffer {
    const privateKeyPem = forge.pki.privateKeyFromPem(privateKey)
    const encrypted = forge.util.decode64(encryptedData)
    const decrypted = privateKeyPem.decrypt(encrypted, this.encryptionScheme, {
      md: forge.md.sha256.create(),
    })
    return decrypted
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
    const data = "Hello World"
    const encrypted = this.encrypt(publicKey, data)
    const decrypted = this.decrypt(privateKey, encrypted)
    return data === decrypted
  }
}

export default Encryption
