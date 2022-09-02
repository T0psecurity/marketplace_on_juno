export const customPromiseAll = (queries: Promise<any>[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    Promise.all(queries)
      .then((results) => resolve(results))
      .catch((err) => reject(err));
  });
};
