import { Kafka, logLevel } from "kafkajs"

export class Eventbus {
    private static kafka: Kafka;

    /**
     * Singleton
     * @private
     */
    private constructor() {}

    /**
     * Returns a new kafka instance.
     */
    public static getInstance() : Kafka {
        if (! Eventbus.kafka) {
            Eventbus.kafka = new Kafka({
                clientId: 'hello',
                brokers: [],
                logLevel: logLevel.INFO,
            })
        }

        return Eventbus.kafka
    }
}