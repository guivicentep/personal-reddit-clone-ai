'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

function CreateCommunityButton() {
  const { user } = useUser()
  const [errorMessage, setErrorMessage] = useState("")
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)

    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value))
    }
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 21)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full p-2 pl-5 flex items-center rounded-md cursor-pointer 
      bg-black text-white hover:bg-black transition-all duration-200 disabled:text-sm 
        disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!user}
      >
        <Plus className="w-4 h-4 mr-2" />
        {user ? "Create a Community" : "Sign in to create community"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Community</DialogTitle>
          <DialogDescription>
            Create a community/subreddit to share ideas and get feedback.
          </DialogDescription>
          <form>
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Community Name
              </label>
              <Input 
                id="name"
                name="name"
                placeholder="My Community"
                className="w-full focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={handleNameChange}
                required
                minLength={3}
                maxLength={21}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Community Slug (URL)
              </label>
              <Input 
                id="slug"
                name="slug"
                placeholder="My Community"
                className="w-full focus:ring-2 focus:ring-blue-500"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                minLength={3}
                maxLength={21}
                pattern="[a-z0-9-]+"
                title="Lowercase letters, numbers, and hyphens only"
              />
              <p className="text-xs text-gray-500">
                This will be used in the URL: reddish.com/community/
                {slug || "community-slug"}
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea 
                id="description"
                name="description"
                placeholder="What is this community about?"
                className="w-full focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default CreateCommunityButton