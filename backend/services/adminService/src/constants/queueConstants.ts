

export const QUEUE_NAMES = {
    USER_TO_ADMIN_QUEUE : 'userToAdminQueue',
    DOCTOR_TO_ADMIN_QUEUE :'doctorToAdminQueue',
};

export const ERROR_MESSAGES = {
    CHANNEL_FAILURE: 'Failed to get channel. RabbitMQ might not be connected.',
    EMPTY_MESSAGE: 'Received an empty message.',
};

export const SUCCESS_MESSAGES = {
    USER_SAVED: 'User data saved in admin database',
    USER_UPDATED: 'User data updated successfully',
};
