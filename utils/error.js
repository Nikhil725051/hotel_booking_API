export const createError = (status, message) =>{
    var err = new Error();
    err.status = status;
    err.message = message;
    return err;
}