export const checkImage = (file: File) => {
  const types = ['image/png', 'image/jpeg']
  let error = ''
  if (!file) return (error = 'File does not exits')
  if (file.size > 1024 * 1024) error = 'The largest image size is 1mb'
  if (!types.includes(file.type))
    error = 'The image incorrect. Only support png or jpeg'
  return error
}

export const imageUpload = async (file: File) => {
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'en5xl7g8')
  data.append('cloud_name', 'mp-dev')
  const formData = await fetch(
    'https://api.cloudinary.com/v1_1/mp-dev/upload',
    {
      method: 'POST',
      body: data,
    }
  )
  const photoData = await formData.json()
  return { public_id: photoData.public_id, url: photoData.secure_url }
}
