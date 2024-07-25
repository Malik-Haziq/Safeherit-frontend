import { Asset, Currency } from "@/types"
import { getCookie } from "./cookie"

function convert(
  amount: number,
  currentCurrency: string,
  convertToCurrency: any,
  currencies: Currency,
): number {
  const resData = currencies
  const baseCurrency = resData.base
  const rates: any = resData.rates
  let unitOfCurrentInBaseCurrency: number
  if (baseCurrency == currentCurrency) {
    unitOfCurrentInBaseCurrency = 1
  } else {
    if (!(currentCurrency in rates)) {
      return 0
    }
    unitOfCurrentInBaseCurrency = rates[currentCurrency]
  }

  const amountInBaseCurrency = amount / unitOfCurrentInBaseCurrency

  if (!(convertToCurrency in rates)) {
    return 0
  }
  const unitOfConvertingInBaseCurrency = rates[convertToCurrency]
  const convertedAmount = amountInBaseCurrency * unitOfConvertingInBaseCurrency
  return Math.round((convertedAmount + Number.EPSILON) * 100) / 100 // round to 2 decimal places
}

export const calculateTotalAssetsCost = (
  assets: Asset[],
  currencies: Currency,
  assetCostFilter: string,
): number => {
  const defaultCurrency = getCookie('defaultCurrency')
  let sum = 0
  let filteredAssets: Asset[] =
    assetCostFilter !== "All"
    ? assets?.filter((asset) => asset.data.category === assetCostFilter)
    : assets

  if (filteredAssets.length > 0) {
    filteredAssets.forEach((asset) => {
      const amount = asset.data["Acquisition cost"] || asset.data["Balance"] || 0
      if (amount) {
        sum = sum + convert(amount, asset?.data?.Currency, defaultCurrency, currencies)
      }
    })
  }
  return sum
}
