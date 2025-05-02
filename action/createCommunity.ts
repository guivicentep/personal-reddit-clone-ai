'use server'

export type ImageData = {
  base64: string
  filename: string
  contentType: string
}

export async function createCommunity(
  name: string,
  imageBase64: string | null | undefined,
  imageFilename: string | null | undefined,
  imageContentType: string | null | undefined,
  slug?: string,
  description?: string
) {
  try {
    
  } catch (error) {
    console.error("Error in createCommunity", error)
    return { error: "Failed to create community" }
  }
}
