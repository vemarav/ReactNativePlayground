export const random = () => {
  const codes = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    const index = Math.ceil(Math.random() * 15)
    color += codes.charAt(index)
  }
  return color
}

export default {random}
