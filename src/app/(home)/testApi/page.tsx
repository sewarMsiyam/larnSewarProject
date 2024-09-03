"use client"
import { useEffect, useState } from "react"
import shcFetch from "@/services/shcFetch"
import Link from "next/link";
type DataType = {
  userId: number
  id: number
  title: string
  completed: string
}

const ApiTestPage = () => {
  const [data, setData] = useState<DataType[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await shcFetch<DataType[]>("/todos", { method: "GET" })
        setData(result)
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
      <h1 className="text-5xl">Data from API </h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link href="/${id}">{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ApiTestPage
