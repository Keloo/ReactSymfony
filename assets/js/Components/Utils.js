import React from 'react'

class Utils {
    static ROLE_USER = 'ROLE_USER';
    static ROLE_REALTOR = 'ROLE_REALTOR';
    static ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';

    // ROLE_SUPER_ADMIN implies ROLE_REALTOR. All users have ROLE_USER
    static hasRole(roles, role) {
        if (roles === undefined || !Array.isArray(roles))
            return false;

        switch (role) {
            case Utils.ROLE_USER:
                return true;
            case Utils.ROLE_REALTOR:
                return (
                    roles.indexOf(Utils.ROLE_REALTOR) !== -1 ||
                    roles.indexOf(Utils.ROLE_SUPER_ADMIN) !== -1
                );
            case Utils.ROLE_SUPER_ADMIN:
                return (roles.indexOf(Utils.ROLE_SUPER_ADMIN) !== -1);
            default:
                return false;
        }
    }

    static handleError(response, callback) {
        if (response.status === 200)
            return callback(response);

        console.error(response);
    }
}

export default Utils;