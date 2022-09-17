import { IBlogs, IUserRegister } from './Typescript'

export const ValidRegister = (data: IUserRegister) => {
  const { name, account, password, cf_password } = data
  const errors: string[] = []
  if (!name) {
    errors.push('Please add your name')
  } else if (name.length > 20) {
    errors.push('Your name is up to 20 chars long')
  }
  if (!account) {
    errors.push('Please add your email address')
  } else if (!validateEmail(account)) {
    errors.push('Email address format is incorrect.')
  }
  if (password.length < 6) {
    errors.push('Password must be at least 6 chars.')
  } else if (password !== cf_password) {
    errors.push('Confirm password did not match.')
  }
  const msg = checkPassword(password, cf_password)
  if (msg) errors.push(msg)
  return {
    errMsg: errors,
    errLength: errors.length,
  }
}

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return 'Password must be at least 6 chars.'
  } else if (password !== cf_password) {
    return 'Confirm password did not match.'
  }
}
export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const ValidCreateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlogs) => {
  const errors: string[] = []
  if (title.trim().length < 10) {
    errors.push('Title has at least 10 characters')
  } else if (title.trim().length > 50) {
    errors.push('Title is up to 50 characters long')
  }
  if (content.trim().length < 1000) {
    errors.push('Title has at least 1000 characters')
  }
  if (description.trim().length < 50) {
    errors.push('Description has at least 50 characters')
  } else if (description.trim().length > 200) {
    errors.push('Description is up to 200 characters long')
  }
  if (!thumbnail) {
    errors.push('Please add thumbnail')
  }
  if (!category) {
    errors.push('Please add category')
  }
  return {
    errMsg: errors,
    errLength: errors.length,
  }
}

export const shallowEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }
  return true
}
