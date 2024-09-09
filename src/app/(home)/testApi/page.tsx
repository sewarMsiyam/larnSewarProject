"use client"
import { useEffect, useState } from "react"
import shcFetch from "@/services/shcFetch"
import Link from "next/link";

type Course = {
  id: number
  name: string
}

type ApiResponse = {
  status: number
  message: string
  item: {
    courses: Course[]
  }
}

const ApiTestPage = () => {
  const [data, setData] = useState<Course[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await shcFetch<ApiResponse>("https://sewaar.net/api/v1/get_courses/tawjhi", { method: "GET" })
        setData(result.item.courses)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unexpected error occurred.")
        }
      }
    }

    fetchData()
  }, [])

  if (error) return <div>Error: {error}</div>
  if (!data) return <div className="">Loading...</div>

  return (
    <div>
      <h1 className="text-5xl">Data from API</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link href={`/course/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ApiTestPage
