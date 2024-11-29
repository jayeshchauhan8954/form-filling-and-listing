const _collectionName = {
    User: 'User',
    Candidate: 'Candidate'
}

const _status = {
    Active: "Active",
    Inactive: "Inactive",
}

const _UserType = {
    User: 1,
    Admin: 2,
}

const _gender = {
    Male: 'Male',
    Female: 'Female',
    Other: 'Other'
}

const _envMode = {
    local: 'local',
    development: "development",
    production: "production",
    staging: "staging"
}


module.exports = {
    _collectionName,
    _status,
    _envMode,
    _gender,
    _UserType,
}