import { Consumer, ConsumerSubscribeTopics } from "kafkajs"
import { Eventbus } from "./eventbus"

export class EventbusConsumer {
    /**
     * Kafka consumer
     * @private
     */
    private static consumer: Consumer

    /**
     * Singleton
     * Connects on groupId
     * @param groupId
     */
    public static getInstance(groupId: string|null) : Consumer
    {
        if( EventbusConsumer.consumer ) {
            return EventbusConsumer.consumer
        }

        if(groupId === null) {
            throw new Error("group id can not be null")
        }

        EventbusConsumer.consumer = Eventbus.getInstance().consumer({
            groupId
        })

        return EventbusConsumer.consumer
    }

    /**
     * Connects with the consumer
     */
    public static async connect() : Promise<void>
    {
        await EventbusConsumer.consumer.connect()
    }

    /**
     * Subscribe to a topic
     * @param topicConfig
     * @param groupId
     */
    public static async subscribe(topicConfig: ConsumerSubscribeTopics, groupId: string|null)
    {
        await EventbusConsumer.getInstance(groupId).subscribe(topicConfig)
    }

    /**
     * Handle message when streamed
     * @param callback
     */
    public static async on(callback : Function)
    {
        await EventbusConsumer.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                callback(topic,partition,message)
            }
        })
    }

    public static async stop()
    {
        await EventbusConsumer.consumer.stop()
    }
}