import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
interface IProps {
  total: number
  callback: (page: number) => void
}
const Pagination: React.FC<IProps> = ({ total, callback }) => {
  const newArr = [...Array(total)].map((_, idx) => idx + 1)
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (index: number) => {
    if (index === page) return 'bg-gray-200'
    return ''
  }
  const handlePagination = (page: number) => {
    navigate(`?page=${page}`)
    setPage(page)
    callback(page)
  }
  useEffect(() => {
    const search = location.search.slice(6) || 1
    setPage(Number(search))
  }, [location.search])
  return (
    <div className="flex justify-center items-center my-4">
      <button onClick={() => handlePagination(page - 1)}>Prev</button>
      {/* {firstArr?.map((item) => (
        <div
          key={item}
          onClick={() => {}}
          className={
            `cursor-pointer mx-1 px-3 py-1 rounded hover:bg-gray-200 ` 
          }
        >
          <button>{item}</button>
        </div>
      ))} */}
      {/* {lastArr.length > 0 && <button>...</button>} */}
      {newArr?.map((item) => (
        <div
          key={item}
          onClick={() => handlePagination(item)}
          className={`cursor-pointer mx-1 px-3 py-1 rounded  hover:bg-gray-200 ${isActive(
            item
          )} `}
        >
          <button>{item}</button>
        </div>
      ))}
      <button onClick={() => handlePagination(page + 1)}>Next</button>
    </div>
  )
}

export default Pagination
