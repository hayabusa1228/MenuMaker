import Link from "next/link"

interface TableInfoProps {
  table_num: string,
  dammy_url: string,
  qr_url: string
}

const TableInfo: React.FC<TableInfoProps> = ({ table_num, dammy_url, qr_url}) => {
  return (
    <tr className="text-center ">
    <td className="lg:text-xl  md:text-lg text-md border border-green-500 p-3">{table_num}</td>
    <td className="lg:text-xl md:text-lg text-1 border border-green-500 underline">
      <div className="md:hidden block">
      <Link href={qr_url}>
        <a>{"Menu/" + dammy_url}</a>
      </Link>
      </div>
      <div className="md:block  hidden">
      <Link href={qr_url}>
        <a>{"http://MenuMaker/Menu/" + dammy_url}</a>
      </Link>
      </div>

    </td>
    <td className="border border-green-500"><button className="text-sm border border-black rounded-sm md:p-1">print</button></td>
   </tr>
    
  )

}



export { TableInfo }