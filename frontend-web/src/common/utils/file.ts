import { toast } from "@/components"

export const downloadJson = (
  KEY: { privateKey: string } | { publicKey: string },
  fileName: string,
) => {
  const jsonString = JSON.stringify(KEY, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

export const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    toast("Content copied to clipboard", "success")
  } catch (err) {
    toast("Could not copy text", "error")
  }
}
