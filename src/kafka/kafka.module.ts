import { Module } from "@nestjs/common"
import { EventbusProducer } from "./eventbus-producer"
import { EventbusConsumer } from "./eventbus-consumer"
import { Eventbus } from "./eventbus"

@Module({
    exports: [
        Eventbus, EventbusProducer, EventbusConsumer
    ],
})
export class KafkaModule {}