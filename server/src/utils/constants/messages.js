module.exports = {
    _auth_module: {
        created: (name) => `${name || "Account"} created successfully.`,
        login: (name) => `${name || "Account"} login successfully.`,
        logout: (name) => `${name || "Account"} logout successfully.`,
        allReadyExist: (key) => `${key || "Data"} already exist.`,
        unAuth: "Unauthorized access.",
        tokenMissing: "Token missing, Please login again.",
        tokenExpired: "Token Expired, Please login again."
    },
    _middleware: {
        dbNotInitDB: (name) => `DB not initialize for ${name}.`,
        require: (name) => `${name} is required.`
    },
    _query: {
        add: (key) => `${key || "Record"} add successfully.`,
        get: (key) => `${key || "Record"} fetched successfully.`,
        update: (key) => `${key || "Record"} update successfully.`,
        notFound: (key) => `${key || "Record"} not found.`,
        invalid: (key) => `Invalid ${key}.`,
        save: (key) => `${key || "Record"} saved successfully.`,
        delete: (key) => `${key || "Record"} deleted successfully.`,
        duplicate: (key) => `${key || "Record"} duplicate found.`,
    },


    _response_message: {
        invalid: (key) => `Invalid ${key}.`,
        allReadyExist: (key) => `${key || "Data"} already exist.`,
        created: (name) => `${name || "Record"} created successfully.`,
        updated: (name) => `${name || "Record"} updated successfully.`,
        notFound: (key) => `${key || "Record"} not found.`,
        deleted: (name) => `${name || "Record"} deleted successfully.`,
        allReadyDeleted: (key) => `${key || "Data"} already deleted.`,
        found: (key) => `${key || "Record"} found successfully.`,
        Unauthorized: (key) => `${key || "User"} Unauthorized`,
        errorFound: (key) => `${key} having error`

    }
}

