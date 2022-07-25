import { Kafka, logLevel } from "kafkajs"

class Producer {
    private static kafka: Kafka;

    private constructor() {}

    public static getInstance() : Kafka {
        if( ! Producer.kafka) {
            Producer.kafka = new Kafka({
                clientId: 'hello',
                brokers: [],
                logLevel: logLevel.INFO,
            })
        }

        return Producer.kafka
    }
}