//% color="#AA278D" weight=100 icon="\uf1eb" block="Maker Cloud"
var Makercloud;
(function (Makercloud) {
    var mqttServerProd = "mqtt.makercloud.scaleinnotech.com";
    var mqttServerSit = "mqtt.makercloud.scaleinnotech.com";
    var currentServer = mqttServerProd;
    var wifiSetupCompleted = false;
    var initCompleted = false;
    // bypass ide error
    var basic = {
        pause: function (time) {
        }
    };
    var Server;
    (function (Server) {
        //% blockId="mqtt_server_prod" block="Maker Cloud"
        Server["main"] = "prod";
        //% blockId="mqtt_server_sit" block="Maker Cloud Lab"
        Server["sit"] = "sit";
    })(Server = Makercloud.Server || (Makercloud.Server = {}));
    function connectWifi(ssid, wifiPassword) {
        var result = Obloq_connectWifi();
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
        connectWifi(ssid, wifiPassword);
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
    /** --------------------------------------------------------------------------------------------------------------------------------------------
     *                                                      Obloq CPP functions below
     *
     * --------------------------------------------------------------------------------------------------------------------------------------------
     */
    //% advanced=true shim=Obloq::obloqreadString
    function obloqreadString(size) {
        return "";
    }
    //% advanced=true shim=Obloq::obloqgetRxBufferSize
    function obloqgetRxBufferSize() {
        return 0;
    }
    //% advanced=true shim=Obloq::obloqSetTxBufferSize
    function obloqSetTxBufferSize(size) {
        return;
    }
    //% advanced=true shim=Obloq::obloqSetRxBufferSize
    function obloqSetRxBufferSize(size) {
        return;
    }
    //% advanced=true shim=Obloq::obloqRxBufferedSize
    function obloqRxBufferedSize() {
        return 0;
    }
    //% advanced=true shim=Obloq::obloqEventAfter
    function obloqEventAfter(len) {
        return;
    }
    //% advanced=true shim=Obloq::obloqEventOn
    function obloqEventOn(msg) {
        return;
    }
    //% advanced=true shim=Obloq::obloqClearRxBuffer
    function obloqClearRxBuffer() {
        return;
    }
    //% advanced=true shim=Obloq::obloqClearTxBuffer
    function obloqClearTxBuffer() {
        return;
    }
    //% advanced=true shim=Obloq::obloqforevers
    function obloqforevers(a) {
        return;
    }
    //% advanced=true shim=Obloq::obloqWriteString
    function obloqWriteString(text) {
        return;
    }
    //% advanced=true shim=Obloq::obloqDisDisplay
    function obloqDisDisplay() {
        return;
    }
    //% advanced=true shim=Obloq::obloqEnDisplay
    function obloqEnDisplay() {
        return;
    }
    /** --------------------------------------------------------------------------------------------------------------------------------------------
     *                                                      Obloq functions below
     *
     *  Referring to https://www.dfrobot.com/wiki/index.php/Gravity:_UART_OBLOQ_IoT_Module_SKU:_TEL0118
     *
     * --------------------------------------------------------------------------------------------------------------------------------------------
     */
    var ObloqReceivedMessage = "";
    var isOblqtFirstTimeConnectingToWifi = true;
    var isQbloqSerialInitCompleted = false;
    var OBLOQ_WIFI_CONNECT_SUCCESS = 9;
    var OBLOQ_WIFI_CONNECT_TIMEOUT = 8;
    var OBLOQ_WIFI_CONNECT_FAILURE = 7;
    var OBLOQ_WIFI_CONNECT_ERROR = 7;
    var OBLOQ_WIFI_SEPARATOR = "|";
    /********************************************************************************************
     Function    : sendMessage
     Description : send message via serial port
     Params      : message : message content, it is a string
     Return      : None
     ********************************************************************************************/
    function Obloq_sendMessage(message) {
        obloqWriteString(message + "\r");
    }
    /********************************************************************************************
     Function    : connectWifi
     Description : Connect wifi, once successfully connected Obloq returns: |2|3|ip|\r
     Params      : ssid : wifi SSID
     Params      : pwd :  wifi password
     Return      : result : OBLOQ_WIFI_CONNECT_SUCCESS | OBLOQ_WIFI_CONNECT_TIMEOUT | OBLOQ_WIFI_CONNECT_FAILURE \ OBLOQ_WIFI_CONNECT_ERROR
     ********************************************************************************************/
    function Obloq_connectWifi(ssid, password) {
        var WifiConnectionAttemptTimeout = 10000 / 100;
        var timeSpent = 0;
        if (isOblqtFirstTimeConnectingToWifi) {
            //serial init
            if (!isQbloqSerialInitCompleted) {
                Obloq_serialInit();
            }
            //show icon
            for (var i = 0; i < 3; i++) {
                Obloq_ping();
                basic.pause(100);
            }
            obloqreadString(obloqgetRxBufferSize());
            Obloq_sendMessage("|2|1|" + ssid + "," + password + OBLOQ_WIFI_SEPARATOR);
        }
        while (true) {
            if (ObloqReceivedMessage == "WifiConnected") {
                return OBLOQ_WIFI_CONNECT_SUCCESS;
            }
            else if (ObloqReceivedMessage == "Disconnected") {
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
    function Obloq_serialInit() {
        var item = "";
        //First send data through usb, avoid the first data scrambled.
        obloqWriteString("123");
        item = serial.readString();
        item = serial.readString();
        item = serial.readString();
        serial.redirect(Tx, Rx, BaudRate.BaudRate9600);
        obloqSetTxBufferSize(300);
        obloqSetRxBufferSize(300);
        obloqWriteString("\r");
        item = serial.readString();
        serialinit = OBLOQ_TRUE;
        obloqClearRxBuffer();
        obloqClearTxBuffer();
        onEvent();
    }
})(Makercloud || (Makercloud = {}));
