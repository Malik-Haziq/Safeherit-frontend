import { Buffer } from "buffer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createTicket = createAsyncThunk(
  "createTicket",
  async (Data: any, { getState }) => {
    const { user } = getState() as {
      user: { email: string; displayName: string }
    }
    const auth = Buffer.from(
      `${import.meta.env.VITE_REACT_APP_ZENDESK_EMAIL}/token:${
        import.meta.env.VITE_REACT_APP_ZENDESK_API
      }`,
    ).toString("base64")
    const ticket = {
      ticket: {
        requester: {
          name: user.displayName,
          email: user.email,
        },
        comment: { body: Data },
      },
    }

    try {
      const response = await fetch(
        `https://${
          import.meta.env.VITE_REACT_APP_ZENDESK_SUBDOMAIN
        }.zendesk.com/api/v2/tickets.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify(ticket),
        },
      )

      if (!response.ok) {
        throw new Error("Error creating ticket")
      }

      return response
    } catch (error) {
    }
  },
)
