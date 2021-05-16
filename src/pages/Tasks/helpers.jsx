export const getUsers = (usersData) => {

    const names = [];
    Object.values(usersData).forEach(item => {
        names.push(item.fullName)
    });

    return names.map(user => {
        return { name: user, isCheck: true }
    })
}


export const getMaxValue = (items) => {

    if (items) {
        const { taskId } = Object.values(items).reduce((total, items) => items.taskId > total.taskId ? items : total);
        return taskId;
    }
    return 1;

}