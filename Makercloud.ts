//% color="#AA278D" weight=100 icon="\uf1eb" block="Maker Cloud"
namespace Makercloud {

    let mqttServerProd = "mqtt.makercloud.scaleinnotech.com";
    let mqttServerSit = "mqtt.makercloud.scaleinnotech.com";
    let currentServer = mqttServerProd;

    let wifiSetupCompleted = false;
    let initCompleted = false;

    // bypass ide error
    let basic = {
        pause: (time: number) => {
        }
    };

    export enum Server {

        //% blockId="mqtt_server_prod" block="Maker Cloud"
        main = "prod",
        //% blockId="mqtt_server_sit" block="Maker Cloud Lab"
        sit = "sit"
    }

    function connectWifi(ssid: string, wifiPassword: string) {
        let result = Obloq_connectWifi();

        switch (result) {
            case OBLOQ_WIFI_CONNECT_SUCCESS:
            case OBLOQ_WIFI_CONNECT_TIMEOUT:
            case OBLOQ_WIFI_CONNECT_FAILURE:
                break;
        }
    }

    /** --------------------------------------------------------------------------------------------------------------------------------------------
     *
     *                                                 Block functions below
     *
     * --------------------------------------------------------------------------------------------------------------------------------------------
     */

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
        connectWifi(ssid, wifiPassword);
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


    /** --------------------------------------------------------------------------------------------------------------------------------------------
     *                                                      Obloq CPP functions below
     *
     * --------------------------------------------------------------------------------------------------------------------------------------------
     */

    //% advanced=true shim=Obloq::obloqWriteString
    function obloqWriteString(text: string): void {
        return
    }

    /** --------------------------------------------------------------------------------------------------------------------------------------------
     *                                                      Obloq functions below
     *
     *  Referring to https://www.dfrobot.com/wiki/index.php/Gravity:_UART_OBLOQ_IoT_Module_SKU:_TEL0118
     *
     * --------------------------------------------------------------------------------------------------------------------------------------------
     */

    let ObloqReceivedMessage = "";
    let isOblqtFirstTimeConnectingToWifi = true;
    let isQbloqSerialInitCompleted = false;

    const OBLOQ_WIFI_CONNECT_SUCCESS = 9;
    const OBLOQ_WIFI_CONNECT_TIMEOUT = 8;
    const OBLOQ_WIFI_CONNECT_FAILURE = 7;
    const OBLOQ_WIFI_CONNECT_ERROR = 7;
    const OBLOQ_WIFI_SEPARATOR = "|";

    /********************************************************************************************
     Function    : sendMessage
     Description : send message via serial port
     Params      : message : message content, it is a string
     Return      : None
     ********************************************************************************************/
    function Obloq_sendMessage(message: string) {
        obloqWriteString(message + "\r");
    }

    //% advanced=true shim=Obloq::obloqreadString
    function obloqreadString(size: number): string {
        return "";
    }

    /********************************************************************************************
     Function    : connectWifi
     Description : Connect wifi, once successfully connected Obloq returns: |2|3|ip|\r
     Params      : ssid : wifi SSID
     Params      : pwd :  wifi password
     Return      : result : OBLOQ_WIFI_CONNECT_SUCCESS | OBLOQ_WIFI_CONNECT_TIMEOUT | OBLOQ_WIFI_CONNECT_FAILURE \ OBLOQ_WIFI_CONNECT_ERROR
     ********************************************************************************************/
    function Obloq_connectWifi(ssid: string, password: string) {

        let WifiConnectionAttemptTimeout = 10000 / 100;
        let timeSpent = 0;
        if (isOblqtFirstTimeConnectingToWifi) {
            //serial init
            if (!isQbloqSerialInitCompleted) {
                Obloq_serialInit()
            }
            //show icon
            for (let i = 0; i < 3; i++) {
                Obloq_ping();
                basic.pause(100)
            }
            obloqreadString(obloqgetRxBufferSize())
            Obloq_sendMessage("|2|1|" + ssid + "," + password + OBLOQ_WIFI_SEPARATOR);
        }

        while (true) {
            if (ObloqReceivedMessage == "WifiConnected") {
                return OBLOQ_WIFI_CONNECT_SUCCESS;
            } else if (ObloqReceivedMessage == "Disconnected") {
                return OBLOQ_WIFI_CONNECT_FAILURE;
            }
            basic.pause(100);
            timeSpent += 100;
            if (timeSpent > WifiConnectionAttemptTimeout) {
                return OBLOQ_WIFI_CONNECT_TIMEOUT;
            }
        }
        return OBLOQ_WIFI_CONNECT_ERROR;
    }

    /********************************************************************************************
     Function    : ping
     Description : Check if the serial communication is normal. When Obloq serial port receives the pingcommand, it will return: |1|1|\r
     Return      : None
     ********************************************************************************************/
    function Obloq_ping() {
        Obloq_sendMessage("|1|1|");
    }


    function Obloq_serialInit(): void {
        let item = ""
        //First send data through usb, avoid the first data scrambled.
        obloqWriteString("123")
        item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        serial.redirect(
            Tx,
            Rx,
            BaudRate.BaudRate9600
        )
        obloqSetTxBufferSize(300)
        obloqSetRxBufferSize(300)
        obloqWriteString("\r")
        item = serial.readString()
        serialinit = OBLOQ_TRUE
        obloqClearRxBuffer()
        obloqClearTxBuffer()
        onEvent()
    }

}