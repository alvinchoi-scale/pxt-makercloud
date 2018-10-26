//% color="#AA278D" weight=100 icon="\uf1eb" block="Maker Cloud"
var Makercloud;
(function (Makercloud) {
    var mqttServerProd = "mqtt.makercloud.scaleinnotech.com";
    var mqttServerSit = "mqtt.makercloud.scaleinnotech.com";
    var currentServer = mqttServerProd;
    var wifiSetupCompleted = false;
    var initCompleted = false;
    var Server;
    (function (Server) {
        //% blockId="mqtt_server_prod" block="Maker Cloud"
        Server["main"] = "prod";
        //% blockId="mqtt_server_sit" block="Maker Cloud Lab"
        Server["sit"] = "sit";
    })(Server = Makercloud.Server || (Makercloud.Server = {}));
    /**
     * setup mqtt server
     */
    //% blockId=set_to_sit_server
    //% block="Laboratory"
    function setMqttSit() {
        currentServer = mqttServerSit;
    }
    Makercloud.setMqttSit = setMqttSit;
    /**
     * setup WIFI
     * @param ssid Wifi Name; eg: WIFI
     * @param wifiPassword Wifi Name; eg: password
     */
    //% blockId=setup_wifi
    //% block="Setup WIFI | WIFI Name: %ssid | Password : %wifiPassword"
    function setupWifi(ssid, wifiPassword) {
        wifiSetupCompleted = true;
    }
    Makercloud.setupWifi = setupWifi;
    /**
     * everything starts from here
     */
    //% blockId=init_maker_cloud
    //% block="Run Maker Cloud"
    function initMakerCloud() {
        if (wifiSetupCompleted === false) {
            // wait for setup completed
            return;
        }
        if (initCompleted === false) {
            // init here
            initCompleted = true;
        }
        else {
            // todo
        }
    }
    Makercloud.initMakerCloud = initMakerCloud;
    /**
     * publish message to topic
     * @param key key name of data; eg: KEY
     * @param value value of data; eg: VALUE
     * @param topicName topic name; eg: TOPIC_NAME
     */
    //% blockId=publish_message_to_topic
    //% block="Publish %key -> %value to %topicName"
    function publish(key, value, topicName) {
    }
    Makercloud.publish = publish;
})(Makercloud || (Makercloud = {}));
