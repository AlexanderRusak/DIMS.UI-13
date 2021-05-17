export const getUsers = (usersData) => {

    const names = [];
    Object.values(usersData).filter(item => item.role === 'member').forEach((item) => {
        names.push(item.fullName);
    });

    return names.map((user) => {
        return { name: user, isCheck: true };
    });
};

export const getMaxValue = (items) => {
    if (Object.values(items).length) {
        const { taskId } = Object.values(items).reduce((total, items) => (items.taskId > total.taskId ? items : total));
        return +taskId + 1;
    }
    return 1;
};
