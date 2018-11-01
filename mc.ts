//% weight=10 color=#008B00 icon="\uf1eb" block="Maker Cloud 1"
namespace Makercloud1 {
    let SERIAL_TX = SerialPin.P2
    let SERIAL_RX = SerialPin.P1
    let PROD_SERVER = "mqtt.makercloud.scaleinnotech.com"
    let SIT_SERVER = "mqtt.makercloud-sit.scaleinnotech.com"
    let SERVER = PROD_SERVER

    /**
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
     */
    //% blockId=mc_wifi_setup
    //% block="Maker Cloud setup mqtt | Wi-Fi: | name: %SSID| password: %PASSWORD"
    export function setupWifi(/*wifi*/SSID: string, PASSWORD: string) {
        serial.writeString("|2|1|" + SSID + "," + PASSWORD + "|\r")
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
    }

    function ping() {
        serial.writeString("|1|1|\r")
       
    }


}