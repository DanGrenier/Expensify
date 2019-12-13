export default (expenses) => {
    return expenses.reduce((sum,val) => sum + val.amount,0)

}