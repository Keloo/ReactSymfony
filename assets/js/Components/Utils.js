import React from 'react'

class Utils {
    static fetchHandleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response;
    }
}

export default Utils;