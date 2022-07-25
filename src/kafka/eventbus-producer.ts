import { Eventbus } from "./eventbus"
import { Producer, RecordMetadata } from "kafkajs"

export type ProducerMessage = {
    key: string
    value: string
}

export class EventbusProducer {
    /**
     * Kafka producer
     * @private
     */
    private static producer: Producer

    /**
     * Singleton
     * @private
     */
    private constructor() {}

    /**
     * Syntactic sugar. Just calls getInstance and connect
     */
    public static async init() : Promise<EventbusProducer>
    {
        const instance = EventbusProducer.getInstance()
        await instance.connect()

        return EventbusProducer
    }

    /**
     * Get producer instance
     */
    public static getInstance() : Producer {
        if ( EventbusProducer.producer ) {
            return EventbusProducer.producer
        }

        EventbusProducer.producer = Eventbus.getInstance().producer()

        return EventbusProducer.producer
    }

    /**
     * Connects to the producer
     */
    public static async connect() : Promise<void>
    {
        await EventbusProducer.getInstance().connect()
    }

    /**
     * Send message to the producer
     * @param topic
     * @param messages
     */
    public static async send(topic: string, messages : ProducerMessage[]) : Promise<RecordMetadata[]>
    {
        return await EventbusProducer.producer.send({
            topic,
            messages
        })
    }
}