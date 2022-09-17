import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DialogConfirm from '../../../components/common/DialogConfirm'
import IconTooltip from '../../../components/common/IconTooltip'
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../../redux/actions/categoryAction'
import {
  FormSubmit,
  ICategory,
  InputChange,
  ReduxState,
  useTypedDispatch,
} from '../../../utils/Typescript'

const Category = () => {
  const [name, setName] = useState('')
  const [open, setOpen] = React.useState(false)
  const [categoryDelete, setCategoryDelete] = useState<string>('')
  const [edit, setEdit] = useState<ICategory | null>(null)
  const [pageSize, setPageSize] = useState(5)
  console.log('edit', edit)
  const { auth, categories } = useSelector((state: ReduxState) => state)
  useEffect(() => {
    if (edit !== null) {
      setName(edit.name)
    }
  }, [edit])
  const dispatch = useTypedDispatch()
  const handleChangeInput = (e: InputChange) => {
    setName(e.target.value)
  }

  const onHandleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (!auth.token || !name) return
    if (edit !== null) {
      if (edit.name === name) return
      dispatch(updateCategory(name, edit.slug, auth))
    } else {
      dispatch(createCategory(name, auth))
    }
    setEdit(null)
    setName('')
  }
  const handleDeleteCategory = () => {
    if (!auth.token) return
    dispatch(deleteCategory(categoryDelete, auth))
    setOpen(false)
  }
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'slug', headerName: 'Slug', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: (params: any) =>
        new Date(params.row.createdAt).toLocaleString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <button onClick={() => setEdit(params.row)} className="font-medium">
            <IconTooltip
              icon={<EditIcon color="success" fontSize="medium" />}
              title="Edit"
            />
          </button>
          <button
            onClick={() => {
              setCategoryDelete(params.row.slug)
              setOpen(true)
            }}
            className="ml-3 font-medium"
          >
            <IconTooltip
              icon={<DeleteIcon color="error" fontSize="medium" />}
              title="Delete"
            />
          </button>
        </>
      ),
    },
  ]

  return (
    <>
      <div className="max-w-screen-xl px-4 mx-auto  md:px-6 lg:px-8">
        <h3 className="text-xl font-semibold my-10">Category</h3>
        <div className="w-[600px]">
          <form onSubmit={onHandleSubmit} className="flex items-end w-full">
            <div className="my-3 w-full">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChangeInput}
                className="mt-1 px-4 py-2 rounded border w-full"
              />
            </div>
            <div className="my-3 ml-3">
              <button
                type="submit"
                className="bg-green-600 text-white rounded px-4 py-2 w-full"
              >
                {edit !== null ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="max-w-full mx-auto">
            {/* <div className="relative overflow-x-auto  sm:rounded-lg">
              <div className="p-4">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" />
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search htmlFor items"
                />
              </div>
            </div> */}

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={categories}
                columns={columns}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                // checkboxSelection
                getRowId={(row) => row._id}
              />
            </div>
          </div>
        </div>
      </div>

      <DialogConfirm
        isOpenConfirm={open}
        setIsOpenConfirm={setOpen}
        onHandleSubmit={handleDeleteCategory}
      />
    </>
  )
}

export default Category
