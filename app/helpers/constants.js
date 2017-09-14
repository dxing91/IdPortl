export const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12','13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
  '31']

export const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const years = []
const currentYear = (new Date()).getFullYear()
for (let i = 0; i < 91; i++) {
  years.push(currentYear - 90 + i)
}
