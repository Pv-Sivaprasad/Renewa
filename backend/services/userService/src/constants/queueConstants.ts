

export const QUEUE_NAMES = {
    ADMIN_TO_USER_QUEUE : 'AdminToUserQueue',
    DOCTOR_TO_USER_QUEUE :'DocToUserQueue',
    DOCTOR_STATUS_TO_USER_QUEUE:'DocStatusToUserQueue',
    EXCHANGE_NAME:'DocSlotExchange',
    DOC_SLOT_TO_USER_QUEUE:'DocSlotToUserQueue',
    USER_TO_ADMIN_QUEUE:'userToAdminQueue',
    PAYMENT_EXCHANGE_NAME:'PaymentInfoExchange',
    PAY_EXC_NAME:'f',
    USER_BOOK_TO_DOC:'UserBookingDataToDoctor'
};

export const ERROR_MESSAGES = {
    CHANNEL_FAILURE: 'Failed to get channel. RabbitMQ might not be connected.',
    EMPTY_MESSAGE: 'Received an empty message.',
};

export const SUCCESS_MESSAGES = {
    SLOT_DATA_SAVED: 'Slot data saved in user database',
    SLOT_DATA_UPDATED: 'User data updated successfully',
    DOC_STATUS_UPDATED:'Doc status changed and updated',
    DOC_DATA_SAVED:'Doc data saved successfully'
};
