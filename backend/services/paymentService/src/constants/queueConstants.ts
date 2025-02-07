
export const QUEUE_NAMES={
EXCHANGE_NAME:'DocSlotExchange',
PAYMENT_EXCHANGE_NAME:'PaymentInfoExchange',
DOC_SLOT_TO_PAYMENT_QUEUE:'DocSlotToPaymentQueue',
USER_TO_ADMIN_QUEUE:'userToAdminQueue'
}


export const ERROR_MESSAGES = {
    CHANNEL_FAILURE: 'Failed to get channel. RabbitMQ might not be connected.',
    EMPTY_MESSAGE: 'Received an empty message.',
};
