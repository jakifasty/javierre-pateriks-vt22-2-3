function resolvePromise (promiseToResolve, promiseState, notifyACB){
  if (promiseState.promise && !promiseState.data && !promiseState.error);
  if (promiseToResolve == null) return;
  promiseState.promise=promiseToResolve;
  promiseState.data= null;
  promiseState.error= null;
  if(notifyACB) notifyACB();
  function saveDataACB(result) {
    if(promiseState.promise !== promiseToResolve) return;
    /* TODO save results in promiseState, as before */
    promiseState.data = result;
    /* TODO Notify */
  }
  function saveErrorACB(err) {
    if(promiseState.promise !== promiseToResolve) return;
    /* TODO save error in promiseState, as before */
    promiseState.error = err;
    /* TODO Notify */
  }
  promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}
export default resolvePromise