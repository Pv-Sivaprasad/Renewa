
export const  QUEUE_NAMES={
    ADMIN_TO_DOC_QUEUE:  'AdminToDoctorQueue',
    EXCHANGE_NAME:'DocSlotExchange',
    DOC_STATUS_TO_USER_QUEUE:'DocStatusToUserQueue',
    DOC_TO_ADMIN_QUEUE:'doctorToAdminQueue',
    DOC_TO_USER_QUEUE:'DocToUserQueue'
}



export const SUCCESS_MESSAGES={
    DATA_UPDATED:'Successfully updated the '
}

export const ERROR_MESSAGES = {
    CHANNEL_FAILURE: 'Failed to get channel. RabbitMQ might not be connected.',
    EMPTY_MESSAGE: 'Received an empty message.',
};