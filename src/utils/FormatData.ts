export const titleCase = (data: string) => {
  //1. Tách các từ, cụm từ trong chuỗi ban đầu
  let sentence = data.toLowerCase().split(' ')

  //2. Tạo vòng lặp và viết hoa chữ cái đầu tiên của các từ, cụm từ trên
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }
  //3. Nối các từ, cụm từ đã xử lý ở trên và trả về kết quả
  return sentence.join(' ')
}

export const limitData = (data: string) => {
  if (data.length > 100) {
    return data.slice(0, 100) + '...'
  } else {
    return data
  }
}
