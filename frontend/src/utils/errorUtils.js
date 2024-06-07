export const getResponseError = (error) => {
    if (error === null || error === undefined){
        return null;
    }
    const resData = error.response
    if (resData){
        const errorData = {
            statusCode: resData.status,
            statusType: getTypeFromStatus(resData.status),
            message: resData.data,
            title: resData.statusText
        }

        console.log(errorData, resData.status, resData.data);
        return errorData;
    }
};

const getTypeFromStatus = (statusCode) => {
    if (statusCode === 200 || statusCode === 201){
        return 'success'
    } else if (statusCode === 400 || statusCode === 401){
        return 'error'
    } else {
        return 'info'
    }
}