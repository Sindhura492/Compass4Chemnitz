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
        return errorData;
    }
};

export const getResponseInfo = (messageResponse) => {
    if (messageResponse === null || messageResponse === undefined){
        return null;
    }
    if (messageResponse){
        const messageData = {
            statusCode: messageResponse.status,
            statusType: getTypeFromStatus(messageResponse.status),
            message: messageResponse.data,
            title: messageResponse.statusText
        }
        return messageData;
    }
}

const getTypeFromStatus = (statusCode) => {
    if (statusCode === 200 || statusCode === 201){
        return 'success'
    } else if (statusCode === 400 || statusCode === 401 || statusCode === 404){
        return 'error'
    } else {
        return 'info'
    }
}