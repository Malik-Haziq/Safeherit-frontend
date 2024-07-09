export const convertTimestampsToPlanDuration = (periodEnd: number, periodStart: number) => {
  const durationInSeconds = periodEnd - periodStart
  const durationInDays = Math.floor(durationInSeconds / (3600 * 24))

  const currentDate = new Date()
  const nextRenewalDate = new Date(
    currentDate.getTime() + durationInDays * 24 * 60 * 60 * 1000,
  )
  const formattedNextRenewalDate = nextRenewalDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return {
    duration: durationInDays,
    renewalDate: formattedNextRenewalDate,
  }
}
