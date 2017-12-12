

export const getBookByID = (list,id: string) => {
    var result = null;
    if(list) {
        list.some(item => {
            if (item.id === id) {
                result = item;
            }
        });
    }
    return result;
};