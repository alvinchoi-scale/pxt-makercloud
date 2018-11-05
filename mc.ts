//% weight=10 color=#008B00 icon="\uf1eb" block="Maker Cloud "
namespace Makercloud {
    let SERIAL_TX = SerialPin.P2
    let SERIAL_RX = SerialPin.P1
    let PROD_SERVER = "mqtt.makercloud.scaleinnotech.com"
    let SIT_SERVER = "mqtt.makercloud-sit.scaleinnotech.com"
    let SERVER = PROD_SERVER

    /**
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     */
    //% blockId=mc_wifi_setup
    //% block="Maker Cloud setup mqtt | Wi-Fi: | name: %ssid| password: %password"
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
    //% blockId=mc_change_to_sit
    //% block="tell %topic about %message"
    //% advance=true
    export function publishToTopic(topic: string, message: string) {
        serial.writeString("|4|1|3|" + topic + "|" + message + "|\r");
    }

    /**
     * Connect your device to MQTT Server
     */
    //% blockId=mc_connect_mqtt
    //% block="Maker Cloud setup mqtt | Wi-Fi: | name: %SSID| password: %PASSWORD"
    export function connectMqtt() {
        let port = 1883;
        serial.writeString("|4|1|1|" + SERVER + "|" + port + "|\r")
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
    }

    function ping() {
        serial.writeString("|1|1|\r")

    }


}