import React, { useState } from 'react'

const Search = () => {
  const [search, setSearch] = useState('')
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={search}
        placeholder="Search something..."
        className="border rounded px-4 py-1 w-full"
      />
    </div>
  )
}

export default Search
