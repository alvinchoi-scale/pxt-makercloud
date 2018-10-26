//% color="#AA278D" weight=100 icon="\uf1eb" block="Maker Cloud"
namespace Makercloud {

    let mqttServerProd = "mqtt.makercloud.scaleinnotech.com";
    let mqttServerSit = "mqtt.makercloud.scaleinnotech.com";
    let currentServer = mqttServerProd;

    let wifiSetupCompleted = false;
    let initCompleted = false;

    export enum Server {

        //% blockId="mqtt_server_prod" block="Maker Cloud"
        main = "prod",
        //% blockId="mqtt_server_sit" block="Maker Cloud Lab"
        sit = "sit"
    }


    /**
     * setup mqtt server
     */
    //% blockId=set_to_sit_server
    //% block="Laboratory"
    export function setMqttSit() {
        currentServer = mqttServerSit;
    }

    /**
     * setup WIFI
     * @param ssid Wifi Name; eg: WIFI
     * @param wifiPassword Wifi Name; eg: password
     */
    //% blockId=setup_wifi
    //% block="Setup WIFI | WIFI Name: %ssid | Password : %wifiPassword"
    export function setupWifi(ssid: string, wifiPassword: string) {
        wifiSetupCompleted = true;
    }

    /**
     * everything starts from here
     */
    //% blockId=init_maker_cloud
    //% block="Run Maker Cloud"
    export function initMakerCloud() {
        if (wifiSetupCompleted === false) {
            // wait for setup completed
            return;
        }
        if (initCompleted === false) {
            // init here
            initCompleted = true;
        } else {
            // todo
        }
    }

    /**
     * publish message to topic
     * @param key key name of data; eg: KEY
     * @param value value of data; eg: VALUE
     * @param topicName topic name; eg: TOPIC_NAME
     */
    //% blockId=publish_message_to_topic
    //% block="Publish %key -> %value to %topicName"
    export function publish(key: string, value: string, topicName: string) {

    }
}
