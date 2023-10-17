// Creates partition based on file id
export const createKey = (id: string) => `shares/${id[0]}/${id[1]}/${id}`;