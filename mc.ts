//% weight=10 color=#008B00 icon="\uf1eb" block="Maker Cloud 1"
namespace Makercloud1 {
    let SERIAL_TX = SerialPin.P2
    let SERIAL_RX = SerialPin.P1
    let PROD_SERVER = "mqtt.makercloud.scaleinnotech.com"
    let SIT_SERVER = "mqtt.makercloud-sit.scaleinnotech.com"
    let SERVER = PROD_SERVER
    let dataHandler = {}

    /**
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     */
    //% blockId=mc_wifi_setup
    //% block="connect Wi-Fi: | name: %ssid| password: %password"
    export function setupWifi(ssid: string, password: string) {
        serial.writeString("|2|1|" + ssid + "," + password + "|\r")
    }

    /**
     * For testing purpose
     */
    //% blockId=mc_change_to_sit
    //% block="Maker Cloud Lab"
    //% advance=true
    export function changeToSitServer() {
        SERVER = SIT_SERVER
    }


    /**
     * @param topic ,eg: "topic"
     * @param message ,eg: "message"
     */
    //% blockId=mc_publish_message_to_topic
    //% block="tell %topic about %message"
    //% advance=true
    export function publishToTopic(topic: string, message: string) {
        serial.writeString("|4|1|3|" + topic + "|" + message + "|\r");
    }

    /**
     * Connect your device to MQTT Server
     */
    //% blockId=mc_connect_mqtt
    //% block="connect mqtt"
    export function connectMqtt() {
        let port = 1883;
        serial.writeString("|4|1|1|" + SERVER + "|" + port + "|" + "username" + "|" + "password" + "|\r")
    }

    /**
     * Subscribe to MQTT topic
     */
    //% blockId=mc_subscribe_topic
    //% block="subscribe to %topic"
    export function subscrbeTopic(topic: string) {
        serial.writeString("|4|1|2|" + topic + "|\r")
    }

    /**
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
     */
    //% weight=102
    //% blockId=mc_init
    //% block="Initialise Maker Cloud"
    export function init() {
        serial.redirect(
            SERIAL_TX,
            SERIAL_RX,
            BaudRate.BaudRate9600
        )
        ping()
        ping()
        ping()
        serial.onDataReceived("\r", onDataReceivedHandler)
    }

    function handleTopicMessage(topic:string, message: string) {
        basic.showString(message)
    }

    function onDataReceivedHandler(): void {
        let response = serial.readUntil("\r")
        let prefix = response.substr(0, 7)
        basic.showString(prefix)
        if (prefix == "|4|1|5|") {
            let message: string[] = splitMessage(response.substr(7, response.length - 1), "|")
            handleTopicMessage(message[0], message[1])
        } else {
            // basic.showString("X")
        }
    }

    function ping() {
        serial.writeString("|1|1|\r")
    }

    function splitMessage(message: string, delimitor: string): string[] {
        let beforeDelimitor = ""
        let afterDelimitor = ""
        let i = 0
        let delimitorPassed = false
        for (i = 0; i < message.length; i++) {
            let letter: string = message.charAt(i)

            if (letter == delimitor) {
                delimitorPassed = true
                continue
            }

            if (delimitorPassed) {
                afterDelimitor += letter
            } else {
                beforeDelimitor += letter
            }
        }
        return [beforeDelimitor, afterDelimitor];
    }

}