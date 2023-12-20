export function jsonToFormData(json: { [key: string]: any }) {
  const formData = new FormData()

  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      formData.append(key, json[key])
    }
  }

  return formData
}
