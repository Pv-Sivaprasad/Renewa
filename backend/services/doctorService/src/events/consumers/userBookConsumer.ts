import { getChannel } from '../../config/rabbitmq';
import { QUEUE_NAMES } from '../../constants/queueConstant';
import { BookService } from '../../services/bookService';
import { DoctorBookingRepository } from '../../repositories/implementations/docBookRepository';

const bookService = new BookService(new DoctorBookingRepository());

export const recivedBookData = async () => {
  const channel = await getChannel();
  if (!channel) {
    console.log('failed to get channel');
    return;
  }

  const queueName = QUEUE_NAMES.PAYMENT_EXCHANGE_NAME;
  console.log(queueName, 'queueName');
  console.log('the consumer in userbook');

  if (channel) {
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (msg) => {
      console.log('checking msg in the doc consumer of booking data');
      if (msg) {
        const { userId, docId, date, startTime, isAvailable, userName } = JSON.parse(msg.content.toString());
        console.log(`userId ${userId}, docId ${docId}, date ${date}, startTime ${startTime}, isAvailable ${isAvailable}, userName ${userName}`);

        const data = { docId, userId, date, startTime, userName };
        try {
          await bookService.processBooking(docId, userId, date, startTime, userName);
          channel.ack(msg);
        } catch (error) {
          console.log('error in this consumer', error);
        }
      }
    });
  }
};
