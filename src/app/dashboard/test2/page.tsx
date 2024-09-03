import { Photos, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Photos[]> {
  
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const data =response.json()
    return  data;
  }catch(error){
    console.log(error)
    return  [];
  }
  return  [];
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
