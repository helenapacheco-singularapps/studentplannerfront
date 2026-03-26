"use client"

import { useRouter } from "next/navigation"
import { Pencil, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

function getProfile() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("profile")
    return saved ? JSON.parse(saved) : {}
  }
  return {}
}

export default function ProfilePage() {
  const router = useRouter()
  const profile = getProfile()

  const [name, setName] = useState(profile.name || "")
  const [nickname, setNickname] = useState(profile.nickname || "")
  const [course, setCourse] = useState(profile.course || "")
  const [college, setCollege] = useState(profile.college || "")
  const [semester, setSemester] = useState(profile.semester || "")
  const [country, setCountry] = useState(profile.country || "")
  const [email, setEmail] = useState(profile.email || "nenacpacheco07@gmail.com")

  const [openEmailModal, setOpenEmailModal] = useState(false)

  function saveProfile() {
    const profileData = {
      name,
      nickname,
      course,
      college,
      semester,
      country,
      email
    }

    localStorage.setItem("profile", JSON.stringify(profileData))
    router.push("/dashboard")
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="w-225">

        <div className="flex items-center gap-4 mb-10">
          <Image
            src="/me.jpg"
            alt="Profile photo"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {name || "Helena Carvalho Pacheco"}
            </h2>

            <div className="flex items-center gap-2 text-gray-500">
              <p className="text-sm">{email}</p>

              <Pencil
                size={14}
                className="text-pink cursor-pointer"
                onClick={() => setOpenEmailModal(true)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm mb-1">Full Name</p>
            <div className="relative">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-100 rounded-md p-3 text-sm"
                placeholder="Your full name"
              />
              <Pencil className="absolute right-3 top-3 text-pink" size={16} />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Nickname</p>
            <div className="relative">
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-gray-100 rounded-md p-3 text-sm"
                placeholder="Your nickname"
              />
              <Pencil className="absolute right-3 top-3 text-pink" size={16} />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Course</p>
            <div className="relative">
              <input
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full bg-gray-100 rounded-md p-3 text-sm"
                placeholder="Your course"
              />
              <Pencil className="absolute right-3 top-3 text-pink" size={16} />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">College</p>
            <div className="relative">
              <input
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-gray-100 rounded-md p-3 text-sm"
                placeholder="Your college"
              />
              <Pencil className="absolute right-3 top-3 text-pink" size={16} />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Semester</p>
            <div className="relative">
              <input
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full bg-gray-100 rounded-md p-3 text-sm"
                placeholder="Your semester"
              />
              <Pencil className="absolute right-3 top-3 text-pink" size={16} />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Country</p>
            <div className="relative">
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-gray-100 rounded-md p-3 text-sm"
                placeholder="Type your country"
              />
              <Pencil className="absolute right-3 top-3 text-pink" size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12 gap-4">
          <button
            onClick={saveProfile}
            className="bg-pink text-white w-48 py-3 rounded-lg font-medium"
          >
            Save
          </button>

          <button className="border border-pink text-pink w-48 py-3 rounded-lg font-medium">
            Cancel
          </button>
        </div>
      </div>

      {openEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white w-150 p-8 rounded-2xl">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Edit your e-mail</h3>
              <X
                className="cursor-pointer"
                onClick={() => setOpenEmailModal(false)}
              />
            </div>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 mb-8"
              placeholder="Your new E-mail"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenEmailModal(false)}
                className="bg-pink/30 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => setOpenEmailModal(false)}
                className="bg-pink text-white px-6 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}