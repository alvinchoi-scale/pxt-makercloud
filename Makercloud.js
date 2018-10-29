/*！
 * @file Obloq/Obloq.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/goods-1577.html)
 * @n Obloq is a serial port of WIFI connection module, Obloq can connect
 *    to Microsoft Azure IoT and other standard MQTT protocol IoT.
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	GNU Lesser General Public License
 *
 * @author [email](xin.li@dfrobot.com)
 * @version  V1.0
 * @date  2018-03-20
 */
//debug
var OBLOQ_DEBUG = false;
var OBLOQ_MQTT_DEFAULT_SERVER = true;
//DFRobot easy iot
var OBLOQ_MQTT_EASY_IOT_SERVER_CHINA = "iot.dfrobot.com.cn";
var OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL = "iot.dfrobot.com";
var OBLOQ_MQTT_EASY_IOT_PORT = 1883;
//other iot
var OBLOQ_MQTT_USER_IOT_SERVER = "---.-----.---";
var OBLOQ_MQTT_USER_IOT_PORT = 0;
//topic max number
var OBLOQ_MQTT_TOPIC_NUM_MAX = 5;
//wrong type
var OBLOQ_ERROR_TYPE_IS_SUCCE = 0;
var OBLOQ_ERROR_TYPE_IS_ERR = 1;
var OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_TIMEOUT = -1;
var OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_FAILURE = -2;
var OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_TIMEOUT = -3;
var OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_TIMEOUT = -4;
var OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_FAILURE = -5;
var OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_FAILURE = -6;
//data type
var OBLOQ_STR_TYPE_IS_NONE = "";
var OBLOQ_BOOL_TYPE_IS_TRUE = true;
var OBLOQ_BOOL_TYPE_IS_FALSE = false;
//topics name
var TOPIC;
(function (TOPIC) {
    TOPIC[TOPIC["topic_1"] = 1] = "topic_1";
    TOPIC[TOPIC["topic_2"] = 2] = "topic_2";
    TOPIC[TOPIC["topic_3"] = 3] = "topic_3";
    TOPIC[TOPIC["topic_4"] = 4] = "topic_4";
})(TOPIC || (TOPIC = {}));
/**
 *Obloq implementation method.
 */
//% weight=10 color=#008B00 icon="\uf1eb" block="Obloq"
var Obloq;
(function (Obloq) {
    //serial
    var OBLOQ_SERIAL_INIT = OBLOQ_BOOL_TYPE_IS_FALSE;
    var OBLOQ_SERIAL_TX = SerialPin.P2;
    var OBLOQ_SERIAL_RX = SerialPin.P1;
    //wifi
    var OBLOQ_WIFI_SSID = OBLOQ_STR_TYPE_IS_NONE;
    var OBLOQ_WIFI_PASSWORD = OBLOQ_STR_TYPE_IS_NONE;
    var OBLOQ_WIFI_IP = "0.0.0.0";
    //mqtt
    var OBLOQ_MQTT_PORT = 0;
    var OBLOQ_MQTT_SERVER = OBLOQ_STR_TYPE_IS_NONE;
    var OBLOQ_MQTT_PWD = OBLOQ_STR_TYPE_IS_NONE;
    var OBLOQ_MQTT_ID = OBLOQ_STR_TYPE_IS_NONE;
    var OBLOQ_MQTT_TOPIC = [["x", "false"], ["x", "false"], ["x", "false"], ["x", "false"], ["x", "false"]];
    //http
    var OBLOQ_HTTP_IP = OBLOQ_STR_TYPE_IS_NONE;
    var OBLOQ_HTTP_PORT = 8080;
    var OBLOQ_HTTP_BUSY = OBLOQ_BOOL_TYPE_IS_FALSE;
    //state
    var OBLOQ_WIFI_CONNECTED = OBLOQ_BOOL_TYPE_IS_FALSE;
    var OBLOQ_WIFI_CONNECT_FIRST = OBLOQ_BOOL_TYPE_IS_TRUE;
    var OBLOQ_MQTT_INIT = OBLOQ_BOOL_TYPE_IS_FALSE;
    var OBLOQ_HTTP_INIT = OBLOQ_BOOL_TYPE_IS_FALSE;
    //callback
    var OBLOQ_MQTT_CB = [null, null, null, null, null];
    //commands
    var OBLOQ_ANSWER_CMD = OBLOQ_STR_TYPE_IS_NONE;
    var OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
    var OBLOQ_WRONG_TYPE = OBLOQ_STR_TYPE_IS_NONE;
    //animation
    var OBLOQ_WIFI_ICON = 1;
    var OBLOQ_MQTT_ICON = 1;
    //event
    var OBLOQ_MQTT_EVENT = OBLOQ_BOOL_TYPE_IS_FALSE;
    //mode
    var OBLOQ_WORKING_MODE_IS_MQTT = OBLOQ_BOOL_TYPE_IS_FALSE;
    var OBLOQ_WORKING_MODE_IS_HTTP = OBLOQ_BOOL_TYPE_IS_FALSE;
    var OBLOQ_WORKING_MODE_IS_STOP = OBLOQ_BOOL_TYPE_IS_TRUE;
    var SERVERS;
    (function (SERVERS) {
        //% blockId=SERVERS_China block="China"
        SERVERS[SERVERS["China"] = 0] = "China";
        //% blockId=SERVERS_Global block="Global"
        SERVERS[SERVERS["Global"] = 1] = "Global";
    })(SERVERS = Obloq.SERVERS || (Obloq.SERVERS = {}));
    var PacketaMqtt = /** @class */ (function () {
        function PacketaMqtt() {
        }
        return PacketaMqtt;
    }());
    Obloq.PacketaMqtt = PacketaMqtt;
    var PacketaHttp = /** @class */ (function () {
        function PacketaHttp() {
        }
        return PacketaHttp;
    }());
    Obloq.PacketaHttp = PacketaHttp;
    //% advanced=true shim=Obloq::obloqreadString
    function obloqreadString(size) {
        return OBLOQ_STR_TYPE_IS_NONE;
    }
    //% advanced=true shim=Obloq::obloqgetRxBufferSize
    function obloqgetRxBufferSize() {
        return OBLOQ_ERROR_TYPE_IS_SUCCE;
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
        return OBLOQ_ERROR_TYPE_IS_SUCCE;
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
    function Obloq_wifi_icon_display() {
        switch (OBLOQ_WIFI_ICON) {
            case 1:
                {
                    basic.clearScreen();
                    led.plot(0, 4);
                    OBLOQ_WIFI_ICON += 1;
                }
                break;
            case 2:
                {
                    led.plot(0, 2);
                    led.plot(1, 2);
                    led.plot(2, 3);
                    led.plot(2, 4);
                    OBLOQ_WIFI_ICON += 1;
                }
                break;
            case 3:
                {
                    led.plot(0, 0);
                    led.plot(1, 0);
                    led.plot(2, 0);
                    led.plot(3, 1);
                    led.plot(4, 2);
                    led.plot(4, 3);
                    led.plot(4, 4);
                    OBLOQ_WIFI_ICON = 1;
                }
                break;
        }
    }
    function Obloq_mqtt_icon_display() {
        switch (OBLOQ_MQTT_ICON) {
            case 1:
                {
                    basic.clearScreen();
                    led.plot(4, 0);
                    OBLOQ_MQTT_ICON += 1;
                }
                break;
            case 2:
                {
                    led.plot(2, 0);
                    led.plot(2, 1);
                    led.plot(3, 2);
                    led.plot(4, 2);
                    OBLOQ_MQTT_ICON += 1;
                }
                break;
            case 3:
                {
                    led.plot(0, 0);
                    led.plot(0, 1);
                    led.plot(0, 2);
                    led.plot(1, 3);
                    led.plot(2, 4);
                    led.plot(3, 4);
                    led.plot(4, 4);
                    OBLOQ_MQTT_ICON = 1;
                }
                break;
        }
    }
    function Obloq_mark_reset(type) {
        if (type == "wifi") {
            OBLOQ_WIFI_IP = "0.0.0.0";
            OBLOQ_WIFI_CONNECT_FIRST = OBLOQ_BOOL_TYPE_IS_TRUE;
            OBLOQ_WIFI_CONNECTED = OBLOQ_BOOL_TYPE_IS_FALSE;
        }
        OBLOQ_MQTT_INIT = OBLOQ_BOOL_TYPE_IS_FALSE;
        OBLOQ_HTTP_INIT = OBLOQ_BOOL_TYPE_IS_FALSE;
        OBLOQ_WIFI_ICON = 1;
        OBLOQ_WIFI_ICON = 1;
        for (var i = 0; i < OBLOQ_MQTT_TOPIC_NUM_MAX; i++) {
            OBLOQ_MQTT_TOPIC[i][1] = "false";
        }
        led.stopAnimation();
        basic.clearScreen();
    }
    function Obloq_serial_init() {
        var item = OBLOQ_STR_TYPE_IS_NONE;
        //First send data through usb, avoid the first data scrambled.
        obloqWriteString("123");
        item = serial.readString();
        item = serial.readString();
        item = serial.readString();
        serial.redirect(OBLOQ_SERIAL_TX, OBLOQ_SERIAL_RX, BaudRate.BaudRate9600);
        obloqSetTxBufferSize(300);
        obloqSetRxBufferSize(300);
        obloqWriteString("\r");
        item = serial.readString();
        OBLOQ_SERIAL_INIT = OBLOQ_BOOL_TYPE_IS_TRUE;
        obloqClearRxBuffer();
        obloqClearTxBuffer();
        onEvent();
    }
    function Obloq_start_connect_http() {
        OBLOQ_WORKING_MODE_IS_HTTP = OBLOQ_BOOL_TYPE_IS_TRUE;
        var ret = Obloq_connect_wifi();
        if (OBLOQ_DEBUG) {
            basic.showNumber(ret);
        }
        switch (ret) {
            case OBLOQ_ERROR_TYPE_IS_SUCCE:
                {
                    basic.showIcon(IconNames.Yes);
                    basic.pause(500);
                    basic.clearScreen();
                    OBLOQ_WIFI_CONNECTED = OBLOQ_BOOL_TYPE_IS_TRUE;
                }
                break;
            case OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_TIMEOUT:
                {
                    basic.showIcon(IconNames.No);
                    basic.pause(500);
                    OBLOQ_WRONG_TYPE = "wifi connect timeout";
                    return;
                }
                break;
            case OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_FAILURE:
                {
                    basic.showIcon(IconNames.No);
                    basic.pause(500);
                    OBLOQ_WRONG_TYPE = "wifi connect failure";
                    return;
                }
                break;
            case OBLOQ_ERROR_TYPE_IS_ERR:
                {
                    basic.showNumber(ret);
                    basic.showIcon(IconNames.No);
                    while (OBLOQ_BOOL_TYPE_IS_TRUE) {
                        basic.pause(10000);
                    }
                }
                break;
        }
        OBLOQ_HTTP_INIT = OBLOQ_BOOL_TYPE_IS_TRUE;
        OBLOQ_WORKING_MODE_IS_STOP = OBLOQ_BOOL_TYPE_IS_FALSE;
    }
    function Obloq_start_connect_mqtt(SERVER, connectStart) {
        OBLOQ_WORKING_MODE_IS_MQTT = OBLOQ_BOOL_TYPE_IS_TRUE;
        if (OBLOQ_MQTT_DEFAULT_SERVER) {
            if (SERVER == SERVERS.China) {
                OBLOQ_MQTT_SERVER = OBLOQ_MQTT_EASY_IOT_SERVER_CHINA;
            }
            else if (SERVER == SERVERS.Global) {
                OBLOQ_MQTT_SERVER = OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL;
            }
            OBLOQ_MQTT_PORT = OBLOQ_MQTT_EASY_IOT_PORT;
        }
        else {
            OBLOQ_MQTT_SERVER = OBLOQ_MQTT_USER_IOT_SERVER;
            OBLOQ_MQTT_PORT = OBLOQ_MQTT_USER_IOT_PORT;
        }
        var ret = 0;
        if (connectStart == "connect wifi") {
            ret = Obloq_connect_wifi();
            if (OBLOQ_DEBUG) {
                basic.showNumber(ret);
            }
            switch (ret) {
                case OBLOQ_ERROR_TYPE_IS_SUCCE:
                    {
                        basic.showIcon(IconNames.Yes);
                        basic.pause(500);
                        basic.clearScreen();
                        OBLOQ_WIFI_CONNECTED = OBLOQ_BOOL_TYPE_IS_TRUE;
                    }
                    break;
                case OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_TIMEOUT:
                    {
                        basic.showIcon(IconNames.No);
                        basic.pause(500);
                        OBLOQ_WRONG_TYPE = "wifi connect timeout";
                        return;
                    }
                    break;
                case OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_FAILURE:
                    {
                        basic.showIcon(IconNames.No);
                        basic.pause(500);
                        OBLOQ_WRONG_TYPE = "wifi connect failure";
                        return;
                    }
                    break;
                case OBLOQ_ERROR_TYPE_IS_ERR:
                    {
                        basic.showNumber(ret);
                        basic.showIcon(IconNames.No);
                        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
                            basic.pause(10000);
                        }
                    }
                    break;
            }
        }
        if (connectStart == "connect wifi" || connectStart == "connect mqtt") {
            ret = Obloq_connect_iot();
            switch (ret) {
                case OBLOQ_ERROR_TYPE_IS_SUCCE:
                    {
                        basic.showIcon(IconNames.Yes);
                        basic.pause(500);
                        basic.clearScreen();
                    }
                    break;
                case OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_TIMEOUT:
                    {
                        basic.showIcon(IconNames.No);
                        basic.pause(500);
                        OBLOQ_WRONG_TYPE = "mqtt subtopic timeout";
                        return;
                    }
                    break;
                case OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_FAILURE:
                    {
                        basic.showIcon(IconNames.No);
                        basic.pause(500);
                        OBLOQ_WRONG_TYPE = "mqtt subtopic failure";
                        return;
                    }
                    break;
                case OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_TIMEOUT:
                    {
                        basic.showIcon(IconNames.No);
                        basic.pause(500);
                        OBLOQ_WRONG_TYPE = "mqtt connect timeout";
                        return;
                    }
                    break;
                case OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_FAILURE:
                    {
                        basic.showIcon(IconNames.No);
                        basic.pause(500);
                        OBLOQ_WRONG_TYPE = "mqtt connect failure";
                        return;
                    }
                    break;
                case OBLOQ_ERROR_TYPE_IS_ERR:
                    {
                        basic.showNumber(ret);
                        basic.showIcon(IconNames.No);
                        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
                            basic.pause(10000);
                        }
                    }
                    break;
            }
        }
        OBLOQ_MQTT_INIT = OBLOQ_BOOL_TYPE_IS_TRUE;
        OBLOQ_WORKING_MODE_IS_STOP = OBLOQ_BOOL_TYPE_IS_FALSE;
    }
    basic.forever(function () {
        if (OBLOQ_DEBUG) {
            led.plot(0, 0);
        }
        basic.pause(150);
        if ((OBLOQ_WRONG_TYPE == "wifi disconnect") ||
            (OBLOQ_WRONG_TYPE == "wifi connect timeout") ||
            (OBLOQ_WRONG_TYPE == "wifi connect failure") ||
            (OBLOQ_WRONG_TYPE == "mqtt pulish failure") ||
            (OBLOQ_WRONG_TYPE == "mqtt subtopic timeout") ||
            (OBLOQ_WRONG_TYPE == "mqtt subtopic failure") ||
            (OBLOQ_WRONG_TYPE == "mqtt connect timeout") ||
            (OBLOQ_WRONG_TYPE == "mqtt connect failure")) {
            OBLOQ_WORKING_MODE_IS_STOP = OBLOQ_BOOL_TYPE_IS_TRUE;
            var type = "wifi"; //OBLOQ_WRONG_TYPE.substr(0,4)
            Obloq_mark_reset(type);
            if (OBLOQ_DEBUG) {
                basic.showString(OBLOQ_WRONG_TYPE);
            }
            if (OBLOQ_WORKING_MODE_IS_MQTT) {
                if (OBLOQ_MQTT_SERVER = OBLOQ_MQTT_EASY_IOT_SERVER_CHINA) {
                    Obloq_start_connect_mqtt(SERVERS.China, "connect " + type);
                }
                else if (OBLOQ_MQTT_SERVER = OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL) {
                    Obloq_start_connect_mqtt(SERVERS.Global, "connect " + type);
                }
                else {
                    //do nothing
                }
                if (OBLOQ_MQTT_INIT) {
                    OBLOQ_WRONG_TYPE = OBLOQ_STR_TYPE_IS_NONE;
                    OBLOQ_WORKING_MODE_IS_STOP = OBLOQ_BOOL_TYPE_IS_FALSE;
                }
            }
            if (OBLOQ_WORKING_MODE_IS_HTTP) {
                Obloq_start_connect_http();
                if (OBLOQ_HTTP_INIT) {
                    OBLOQ_WRONG_TYPE = OBLOQ_STR_TYPE_IS_NONE;
                    OBLOQ_WORKING_MODE_IS_STOP = OBLOQ_BOOL_TYPE_IS_FALSE;
                }
            }
        }
        if (OBLOQ_DEBUG) {
            led.unplot(0, 0);
        }
        basic.pause(150);
    });
    /**
     * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IP to IP ,eg: "0.0.0.0"
     * @param PORT to PORT ,eg: 80
     * @param receive to receive ,eg: SerialPin.P1
     * @param send to send ,eg: SerialPin.P2
     */
    //% weight=99
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=Obloq_http_setup
    //% block="Obloq setup http | Pin set: | receiving data (green wire): %receive| sending data (blue wire): %send | Wi-Fi: | name: %SSID| password: %PASSWORD| http config: | ip: %IP| port: %PORT | start connection"
    function Obloq_http_setup(/*serial*/ receive, send, 
    /*wifi*/ SSID, PASSWORD, 
    /*mqtt*/ IP, PORT) {
        OBLOQ_WIFI_SSID = SSID;
        OBLOQ_WIFI_PASSWORD = PASSWORD;
        OBLOQ_HTTP_IP = IP;
        OBLOQ_HTTP_PORT = PORT;
        OBLOQ_SERIAL_TX = send;
        OBLOQ_SERIAL_RX = receive;
        Obloq_serial_init();
        Obloq_start_connect_http();
    }
    Obloq.Obloq_http_setup = Obloq_http_setup;
    /**
     * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_ID to IOT_ID ,eg: "yourIotId"
     * @param IOT_PWD to IOT_PWD ,eg: "yourIotPwd"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
     * @param receive to receive ,eg: SerialPin.P1
     * @param send to send ,eg: SerialPin.P2
     */
    //% weight=102
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% SERVER.fieldEditor="gridpicker" SERVER.fieldOptions.columns=2
    //% blockId=Obloq_mqtt_setup
    //% block="Obloq setup mqtt | Pin set: | receiving data (green wire): %receive| sending data (blue wire): %send | Wi-Fi: | name: %SSID| password: %PASSWORD| IoT service: | Iot_id: %IOT_ID| Iot_pwd: %IOT_PWD| (default topic_0) Topic: %IOT_TOPIC | start connection: | Servers: %SERVER"
    function Obloq_mqtt_setup(/*serial*/ receive, send, 
    /*wifi*/ SSID, PASSWORD, 
    /*mqtt*/ IOT_ID, IOT_PWD, IOT_TOPIC, 
    /*connect*/ SERVER) {
        OBLOQ_WIFI_SSID = SSID;
        OBLOQ_WIFI_PASSWORD = PASSWORD;
        OBLOQ_MQTT_PWD = IOT_PWD;
        OBLOQ_MQTT_ID = IOT_ID;
        OBLOQ_MQTT_TOPIC[0][0] = IOT_TOPIC;
        OBLOQ_SERIAL_TX = send;
        OBLOQ_SERIAL_RX = receive;
        Obloq_serial_init();
        Obloq_start_connect_mqtt(SERVER, "connect wifi");
    }
    Obloq.Obloq_mqtt_setup = Obloq_mqtt_setup;
    /**
     * Disconnect the serial port.
     */
    //% weight=200
    //% blockId=Obloq_mqtt_add_topic
    //% block="subscribe additional %top |: %IOT_TOPIC"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    //% advanced=true
    function Obloq_mqtt_add_topic(top, IOT_TOPIC) {
        OBLOQ_MQTT_TOPIC[top][0] = IOT_TOPIC;
        if (!OBLOQ_MQTT_INIT || OBLOQ_WORKING_MODE_IS_STOP)
            return;
        var _timeout = 0;
        if (OBLOQ_MQTT_TOPIC[top][0] != "x" && OBLOQ_MQTT_TOPIC[top][1] == "false") {
            Obloq_subTopic(OBLOQ_MQTT_TOPIC[top][0]);
        }
        else {
            return;
        }
        while (_timeout < 1000) {
            if (OBLOQ_ANSWER_CMD == "SubOk") {
                OBLOQ_ANSWER_CMD = OBLOQ_STR_TYPE_IS_NONE;
                OBLOQ_MQTT_TOPIC[top][1] = "true";
                break;
            }
            else if (OBLOQ_ANSWER_CMD == "SubFailure") {
                OBLOQ_WRONG_TYPE = "mqtt subtopic failure";
                return;
            }
            basic.pause(1);
            _timeout += 1;
        }
        if (_timeout >= 1000 && OBLOQ_ANSWER_CMD != "SubOk") {
            OBLOQ_WRONG_TYPE = "mqtt subtopic timeout";
        }
        else {
            OBLOQ_MQTT_TOPIC[top][1] = "true";
        }
    }
    Obloq.Obloq_mqtt_add_topic = Obloq_mqtt_add_topic;
    /**
     * Disconnect the serial port.
     */
    /*
    export function Obloq_serial_quit(): void {
        obloqWriteString("quit!\r")
    }*/
    /**
     * Send the ping.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
     */
    //% weight=49
    //% blockId=Obloq_send_ping
    //% block="sendPing"
    //% advanced=true
    function Obloq_send_ping() {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        var time = 5000;
        if (time < 100) {
            time = 100;
        }
        var timeout = time / 100;
        var _timeout = 0;
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|1|1|\r");
        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (OBLOQ_ANSWER_CMD == "PingOk") {
                return OBLOQ_BOOL_TYPE_IS_TRUE;
            }
            else if (OBLOQ_ANSWER_CMD == "timeout") {
                return OBLOQ_BOOL_TYPE_IS_FALSE;
            }
            basic.pause(100);
            _timeout += 1;
            if (_timeout > timeout) {
                if (OBLOQ_ANSWER_CMD != "PingOk") {
                    return OBLOQ_BOOL_TYPE_IS_FALSE;
                }
                else {
                    return OBLOQ_BOOL_TYPE_IS_TRUE;
                }
            }
        }
        return OBLOQ_BOOL_TYPE_IS_FALSE;
    }
    Obloq.Obloq_send_ping = Obloq_send_ping;
    /**
     * Get the software version.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
     */
    //% weight=50
    //% blockId=Obloq_get_version
    //% block="get version"
    //% advanced=true
    function Obloq_get_version() {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        var time = 5000;
        if (time < 100) {
            time = 100;
        }
        var timeout = time / 100;
        var _timeout = 0;
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|1|2|\r");
        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (OBLOQ_ANSWER_CMD == "GetVersion") {
                return OBLOQ_ANSWER_CONTENT;
            }
            else if (OBLOQ_ANSWER_CMD == "timeout") {
                return "timeout";
            }
            basic.pause(100);
            _timeout += 1;
            if (_timeout > timeout) {
                if (OBLOQ_ANSWER_CMD != "GetVersion") {
                    return "timeout";
                }
                else {
                    return OBLOQ_ANSWER_CONTENT;
                }
            }
        }
        return OBLOQ_STR_TYPE_IS_NONE;
    }
    Obloq.Obloq_get_version = Obloq_get_version;
    /**
     * Heartbeat request.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
     */
    //% weight=48
    //% blockId=Obloq_get_heartbeat
    //% block="get heartbeat"
    //% advanced=true
    function Obloq_get_heartbeat() {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        var time = 5000;
        if (time < 100) {
            time = 100;
        }
        var timeout = time / 100;
        var _timeout = 0;
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|1|3|" + time + "|\r");
        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (OBLOQ_ANSWER_CMD == "Heartbeat") {
                return OBLOQ_BOOL_TYPE_IS_TRUE;
            }
            else if (OBLOQ_ANSWER_CMD == "timeout") {
                return OBLOQ_BOOL_TYPE_IS_FALSE;
            }
            basic.pause(100);
            _timeout += 1;
            if (_timeout > timeout) {
                if (OBLOQ_ANSWER_CMD != "Heartbeat") {
                    return OBLOQ_BOOL_TYPE_IS_FALSE;
                }
                else {
                    return OBLOQ_BOOL_TYPE_IS_TRUE;
                }
            }
        }
        return OBLOQ_BOOL_TYPE_IS_FALSE;
    }
    Obloq.Obloq_get_heartbeat = Obloq_get_heartbeat;
    /**
     * Stop the heartbeat request.
     */
    //% weight=47
    //% blockId=Obloq_stop_heartbeat
    //% block="stop heartbeat"
    //% advanced=true
    function Obloq_stop_heartbeat() {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        var time = 5000;
        if (time < 100) {
            time = 100;
        }
        var timeout = time / 100;
        var _timeout = 0;
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|1|3|-2|\r");
        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (OBLOQ_ANSWER_CMD == "Heartbeat") {
                return OBLOQ_BOOL_TYPE_IS_TRUE;
            }
            else if (OBLOQ_ANSWER_CMD == "timeout") {
                return OBLOQ_BOOL_TYPE_IS_FALSE;
            }
            basic.pause(100);
            _timeout += 1;
            if (_timeout > timeout) {
                if (OBLOQ_ANSWER_CMD != "Heartbeat") {
                    return OBLOQ_BOOL_TYPE_IS_FALSE;
                }
                else {
                    return OBLOQ_BOOL_TYPE_IS_TRUE;
                }
            }
        }
        return OBLOQ_BOOL_TYPE_IS_FALSE;
    }
    Obloq.Obloq_stop_heartbeat = Obloq_stop_heartbeat;
    function Obloq_disconnect_wifi() {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        var time = 5000;
        if (time < 100) {
            time = 100;
        }
        var timeout = time / 100;
        var _timeout = 0;
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|2|2|\r");
        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (OBLOQ_ANSWER_CMD == "WifiDisconnect") {
                Obloq_mark_reset("wifi");
                return OBLOQ_BOOL_TYPE_IS_TRUE;
            }
            else if (OBLOQ_ANSWER_CMD == "timeout") {
                return OBLOQ_BOOL_TYPE_IS_FALSE;
            }
            basic.pause(100);
            _timeout += 1;
            if (_timeout > timeout) {
                if (OBLOQ_ANSWER_CMD != "WifiDisconnect") {
                    return OBLOQ_BOOL_TYPE_IS_FALSE;
                }
                else {
                    return OBLOQ_BOOL_TYPE_IS_TRUE;
                }
            }
        }
        return OBLOQ_BOOL_TYPE_IS_FALSE;
    }
    /**
     * Reconnect WiFi.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
     */
    /*
    export function Obloq_wifi_reconnect(): boolean {
        while (OBLOQ_WORKING_MODE_IS_STOP) { basic.pause(20) }
        let time = 10000
        if (time < 100) {
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init()
        }
        obloqWriteString("|2|3|\r")

        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (OBLOQ_ANSWER_CMD == "WifiConnected") {
                OBLOQ_WIFI_IP = OBLOQ_ANSWER_CONTENT
                OBLOQ_WIFI_CONNECT_FIRST = OBLOQ_BOOL_TYPE_IS_FALSE
                OBLOQ_WIFI_CONNECTED = OBLOQ_BOOL_TYPE_IS_TRUE
                return OBLOQ_BOOL_TYPE_IS_TRUE
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) {
                if (OBLOQ_ANSWER_CMD != "WifiConnected") {
                    return OBLOQ_BOOL_TYPE_IS_FALSE
                }
                else {
                    OBLOQ_WIFI_IP = OBLOQ_ANSWER_CONTENT
                    OBLOQ_WIFI_CONNECT_FIRST = OBLOQ_BOOL_TYPE_IS_FALSE
                    OBLOQ_WIFI_CONNECTED = OBLOQ_BOOL_TYPE_IS_TRUE
                    return OBLOQ_BOOL_TYPE_IS_TRUE
                }
            }
        }
        return OBLOQ_BOOL_TYPE_IS_FALSE
    }*/
    /**
     * pin set
     * @param receive to receive ,eg: SerialPin.P1
     * @param send to send ,eg: SerialPin.P2
     */
    /*
    export function Obloq_serial_pin_set(receive: SerialPin, send: SerialPin): void {
        while (OBLOQ_WORKING_MODE_IS_STOP) { basic.pause(20) }
        OBLOQ_SERIAL_TX = send
        OBLOQ_SERIAL_RX = receive
        Obloq_serial_init()
    }*/
    /**
     * connect Wifi.SSID(string):account; PWD(string):password;
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     */
    /*
    //% weight=100
    //% blockId=Obloq_wifi_connect_export
    //% block="wifi connect to| SSID %SSID| PASSWORD %PASSWORD"
    //% advanced=true
    export function Obloq_wifi_connect_export(SSID: string, PASSWORD: string): void {
        while (OBLOQ_WORKING_MODE_IS_STOP) { basic.pause(20) }
        OBLOQ_WIFI_SSID = SSID
        OBLOQ_WIFI_PASSWORD = PASSWORD
        Obloq_connect_wifi()
    }*/
    function Obloq_connect_wifi() {
        if (OBLOQ_WIFI_CONNECTED == OBLOQ_BOOL_TYPE_IS_TRUE) {
            return OBLOQ_ERROR_TYPE_IS_SUCCE;
        }
        OBLOQ_WIFI_ICON = 1;
        var timeout = 10000; //Set the default timeout period 10s.
        timeout = timeout < 100 ? 100 : timeout; //Timeout minimum resolution 100ms
        var timeout_count_max = timeout / 100;
        var timeout_count_now = 0;
        if (OBLOQ_WIFI_CONNECT_FIRST) {
            //serial init
            if (!OBLOQ_SERIAL_INIT) {
                Obloq_serial_init();
            }
            //show icon
            Obloq_wifi_icon_display();
            for (var i = 0; i < 3; i++) {
                obloqWriteString("|1|1|\r");
                basic.pause(100);
            }
            obloqreadString(obloqgetRxBufferSize()); //Clear serial port cache
            obloqWriteString("|2|1|" + OBLOQ_WIFI_SSID + "," + OBLOQ_WIFI_PASSWORD + "|\r"); //Send wifi account and password instructions
            OBLOQ_WIFI_CONNECT_FIRST = OBLOQ_BOOL_TYPE_IS_FALSE;
        }
        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if ((timeout_count_now + 1) % 3 == 0) {
                Obloq_wifi_icon_display();
            }
            if (OBLOQ_ANSWER_CMD == "WifiConnected") {
                OBLOQ_WIFI_IP = OBLOQ_ANSWER_CONTENT;
                return OBLOQ_ERROR_TYPE_IS_SUCCE;
            }
            else if (OBLOQ_ANSWER_CMD == "WifiConnectFailure") {
                return OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_FAILURE;
            }
            basic.pause(100);
            timeout_count_now += 1;
            if (timeout_count_now > timeout_count_max) {
                //basic.showIcon(IconNames.No)
                return OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_TIMEOUT;
            }
        }
        return OBLOQ_ERROR_TYPE_IS_ERR;
    }
    /**
     * Get IP address.
     */
    //% weight=98
    //% blockId=Obloq_Obloq_ifconfig
    //% block="ipconfig"
    //% advanced=true
    function Obloq_wifi_ipconfig() {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        return OBLOQ_WIFI_IP;
    }
    Obloq.Obloq_wifi_ipconfig = Obloq_wifi_ipconfig;
    function Obloq_http_wait_request(time) {
        if (time < 100) {
            time = 100;
        }
        var timeout = time / 100;
        var _timeout = 0;
        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            basic.pause(100);
            if (OBLOQ_ANSWER_CMD == "200") { //http请求成功
                return OBLOQ_ANSWER_CONTENT; //返回消息
            }
            else if (OBLOQ_ANSWER_CMD == "-1") { //获取数据失败
                Obloq_http_wrong_animation("requestFailed");
                return OBLOQ_STR_TYPE_IS_NONE;
            }
            else if (OBLOQ_ANSWER_CMD == "1") { //http请求字段错误
                Obloq_http_wrong_animation("requestFailed");
                return OBLOQ_STR_TYPE_IS_NONE;
            }
            _timeout += 1;
            if (_timeout > timeout) {
                Obloq_http_wrong_animation("timeOut");
                return OBLOQ_STR_TYPE_IS_NONE;
            }
        }
        return OBLOQ_STR_TYPE_IS_NONE;
    }
    function Obloq_http_wrong_animation(wrongType) {
        if (wrongType == "requestFailed") { //http 请求失败或者字段错误动画
            basic.showIcon(IconNames.No, 10);
            basic.pause(500);
            for (var i = 0; i < 3; i++) {
                basic.clearScreen();
                basic.pause(100);
                basic.showIcon(IconNames.No, 10);
                basic.pause(50);
            }
        }
        else if (wrongType == "timeOut") { //http 请求超时动画
            basic.showLeds("\n                . . # . .\n                . . # . .\n                . . # . .\n                . . . . .\n                . . # . .\n                ", 10);
            basic.pause(500);
            for (var i = 0; i < 3; i++) {
                basic.clearScreen();
                basic.pause(100);
                basic.showLeds("\n                    . . # . .\n                    . . # . .\n                    . . # . .\n                    . . . . .\n                    . . # . .\n                    ", 10);
                basic.pause(50);
            }
        }
        basic.pause(150);
        basic.clearScreen();
    }
    /**
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
     */
    //% weight=79
    //% blockId=Obloq_http_get
    //% block="http(get) | url %url| timeout(ms) %time"
    //% advanced=false
    function Obloq_http_get(url, time) {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        if (!OBLOQ_HTTP_INIT)
            return OBLOQ_STR_TYPE_IS_NONE;
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|3|1|http://" + OBLOQ_HTTP_IP + ":" + OBLOQ_HTTP_PORT + "/" + url + "|\r");
        return Obloq_http_wait_request(time);
    }
    Obloq.Obloq_http_get = Obloq_http_get;
    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
     */
    //% weight=78
    //% blockId=Obloq_http_post
    //% block="http(post) | url %url| content %content| timeout(ms) %time"
    function Obloq_http_post(url, content, time) {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        if (!OBLOQ_HTTP_INIT)
            return;
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|3|2|http://" + OBLOQ_HTTP_IP + ":" + OBLOQ_HTTP_PORT + "/" + url + "," + content + "|\r");
        return Obloq_http_wait_request(time);
    }
    Obloq.Obloq_http_post = Obloq_http_post;
    /**
     * The HTTP put request,Obloq.put() can only be used for http protocol!
     * url(string): URL; content(string):content; time(ms): private long maxWait
     * @param time set timeout, eg: 10000
     */
    //% weight=77
    //% blockId=Obloq_http_put
    //% block="http(put) | url %url| content %content| timeout(ms) %time"
    function Obloq_http_put(url, content, time) {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        if (!OBLOQ_HTTP_INIT)
            return;
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|3|3|http://" + OBLOQ_HTTP_IP + ":" + OBLOQ_HTTP_PORT + "/" + url + "," + content + "|\r");
        return Obloq_http_wait_request(time);
    }
    Obloq.Obloq_http_put = Obloq_http_put;
    /**
     * Delete an HTTP connection.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
     */
    /*
    export function Obloq_httpDelete(url: string, content: string, time: number): string[] {
        if (time < 100) {
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init()
        }
        obloqWriteString("|3|4|http://"+myip+":"+myport+"/"+url+","+content+"|\r")
        let item = OBLOQ_STR_TYPE_IS_NONE
        let num = 0
        let j = 0
        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (e == "200") {
                let list = ["200", param]
                return list
            } else if (e == "err") {
                let list = ["err", param]
                return list
            } else if (e == "|2|1|") {
                let list = ["999", "disconnet wifi"]
                return list
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) {
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }*/
    function Obloq_connect_mqtt() {
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|4|1|1|" + OBLOQ_MQTT_SERVER + "|" + OBLOQ_MQTT_PORT + "|" + OBLOQ_MQTT_ID + "|" + OBLOQ_MQTT_PWD + "|\r");
    }
    function Obloq_connect_iot() {
        OBLOQ_MQTT_ICON = 1;
        var iconnum = 0;
        var _timeout = 0;
        var __timeout = 0;
        Obloq_connect_mqtt();
        while (_timeout < 1000) {
            if (_timeout % 50 == 0) {
                Obloq_mqtt_icon_display();
                iconnum += 1;
            }
            if (OBLOQ_ANSWER_CMD == "MqttConneted") {
                break;
            }
            else if (OBLOQ_ANSWER_CMD == "MqttConnectFailure") {
                return OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_FAILURE;
            }
            basic.pause(1);
            _timeout += 1;
        }
        if (_timeout >= 1000 && OBLOQ_ANSWER_CMD != "MqttConneted") {
            return OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_TIMEOUT;
        }
        for (var i = 0; i < OBLOQ_MQTT_TOPIC_NUM_MAX; i++) {
            if (OBLOQ_MQTT_TOPIC[i][0] != "x" && OBLOQ_MQTT_TOPIC[i][1] == "false") {
                Obloq_subTopic(OBLOQ_MQTT_TOPIC[i][0]);
            }
            else {
                continue;
            }
            __timeout = _timeout + 2000;
            while (_timeout < __timeout) {
                if (_timeout % 50 == 0) {
                    Obloq_mqtt_icon_display();
                    iconnum += 1;
                }
                if (iconnum > 3) { //动画一次以上
                    if (OBLOQ_ANSWER_CMD == "SubOk") {
                        OBLOQ_MQTT_TOPIC[i][1] = "true";
                        OBLOQ_ANSWER_CMD = OBLOQ_STR_TYPE_IS_NONE;
                        break;
                    }
                    else if (OBLOQ_ANSWER_CMD == "SubFailure") {
                        return OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_FAILURE;
                    }
                }
                basic.pause(1);
                _timeout += 1;
            }
            if (_timeout >= __timeout) {
                if (OBLOQ_ANSWER_CMD != "SubOk") {
                    OBLOQ_ANSWER_CMD = OBLOQ_STR_TYPE_IS_NONE;
                    return OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_TIMEOUT;
                }
                else {
                    OBLOQ_MQTT_TOPIC[i][1] = "true";
                    OBLOQ_ANSWER_CMD = OBLOQ_STR_TYPE_IS_NONE;
                }
            }
        }
        return OBLOQ_ERROR_TYPE_IS_SUCCE;
        //basic.showString("ok")
    }
    /**
     * Reconnect the MQTT.
     */
    /*
    export function Obloq_mqtt_reconnect(): boolean {
        while (OBLOQ_WORKING_MODE_IS_STOP) { basic.pause(20) }
        let time = 10000
        if (time < 100) {
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init()
        }
        obloqWriteString("|4|1|5|\r")

        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (OBLOQ_ANSWER_CMD == "MqttConneted") {
                OBLOQ_MQTT_INIT = OBLOQ_BOOL_TYPE_IS_TRUE
                return OBLOQ_BOOL_TYPE_IS_TRUE
            } else if (OBLOQ_ANSWER_CMD == "MqttConnectFailure") {
                return OBLOQ_BOOL_TYPE_IS_FALSE
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) {
                if (OBLOQ_ANSWER_CMD != "MqttConneted") {
                    return OBLOQ_BOOL_TYPE_IS_FALSE
                }
                else {
                    OBLOQ_MQTT_INIT = OBLOQ_BOOL_TYPE_IS_TRUE
                    return OBLOQ_BOOL_TYPE_IS_TRUE
                }
            }
        }
        return OBLOQ_BOOL_TYPE_IS_FALSE
    }  */
    /**
     * Disconnect the MQTT connection.
     */
    /*
    export function Obloq_mqtt_disconnect(): boolean {
        while (OBLOQ_WORKING_MODE_IS_STOP) { basic.pause(20) }
        let time = 10000
        if (time < 100) {
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init()
        }
        obloqWriteString("|4|1|4|\r")

        while (OBLOQ_BOOL_TYPE_IS_TRUE) {
            if (OBLOQ_ANSWER_CMD == "MqttDisconnected") {
                OBLOQ_MQTT_INIT = OBLOQ_BOOL_TYPE_IS_FALSE
                return OBLOQ_BOOL_TYPE_IS_TRUE
            } else if (OBLOQ_ANSWER_CMD == "MqttDisconnectFailure") {
                return OBLOQ_BOOL_TYPE_IS_FALSE
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) {
                if (OBLOQ_ANSWER_CMD != "MqttDisconnected") {
                    return OBLOQ_BOOL_TYPE_IS_FALSE
                }
                else {
                    OBLOQ_MQTT_INIT = OBLOQ_BOOL_TYPE_IS_FALSE
                    return OBLOQ_BOOL_TYPE_IS_TRUE
                }
            }
        }
        return OBLOQ_BOOL_TYPE_IS_FALSE
    }   */
    /**
     * Send a message.
     * @param top set top, eg: top
     * @param mess set mess, eg: mess
     */
    //% weight=101
    //% blockId=Obloq_mqtt_send_message
    //% block="pubLish %mess |to topic_0"
    function Obloq_mqtt_send_message(mess) {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        if (!OBLOQ_MQTT_INIT) {
            return;
        }
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|4|1|3|" + OBLOQ_MQTT_TOPIC[0][0] + "|" + mess + "|\r");
    }
    Obloq.Obloq_mqtt_send_message = Obloq_mqtt_send_message;
    /**
     * Send a message.
     * @param top set top, eg: top
     * @param mess set mess, eg: mess
     */
    //% weight=190
    //% blockId=Obloq_mqtt_send_message_more
    //% block="pubLish %mess |to %top"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    //% advanced=true
    function Obloq_mqtt_send_message_more(mess, top) {
        while (OBLOQ_WORKING_MODE_IS_STOP) {
            basic.pause(20);
        }
        if (!OBLOQ_MQTT_INIT) {
            return;
        }
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        switch (top) {
            case TOPIC.topic_1:
                obloqWriteString("|4|1|3|" + OBLOQ_MQTT_TOPIC[1][0] + "|" + mess + "|\r");
                break;
            case TOPIC.topic_2:
                obloqWriteString("|4|1|3|" + OBLOQ_MQTT_TOPIC[2][0] + "|" + mess + "|\r");
                break;
            case TOPIC.topic_3:
                obloqWriteString("|4|1|3|" + OBLOQ_MQTT_TOPIC[3][0] + "|" + mess + "|\r");
                break;
            case TOPIC.topic_4:
                obloqWriteString("|4|1|3|" + OBLOQ_MQTT_TOPIC[4][0] + "|" + mess + "|\r");
                break;
        }
    }
    Obloq.Obloq_mqtt_send_message_more = Obloq_mqtt_send_message_more;
    /**
     * Subscribe to a Topic
     * @param top set top, eg: top
     */
    //% weight=67
    //% blockId=Obloq_subTopic
    //% advanced=true
    function Obloq_subTopic(topic) {
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        obloqWriteString("|4|1|2|" + topic + "|\r");
    }
    function Obloq_mqtt_callback_more(top, a) {
        switch (top) {
            case TOPIC.topic_1:
                OBLOQ_MQTT_CB[1] = a;
                break;
            case TOPIC.topic_2:
                OBLOQ_MQTT_CB[2] = a;
                break;
            case TOPIC.topic_3:
                OBLOQ_MQTT_CB[3] = a;
                break;
            case TOPIC.topic_4:
                OBLOQ_MQTT_CB[4] = a;
                break;
        }
    }
    function Obloq_mqtt_callback(a) {
        OBLOQ_MQTT_CB[0] = a;
    }
    /**
     * This is an MQTT listener callback function, which is very important.
     * The specific use method can refer to "example/ObloqMqtt.ts"
     */
    //% weight=100
    //% blockGap=50
    //% mutate=objectdestructuring
    //% mutateText=PacketaMqtt
    //% mutateDefaults="message:message"
    //% blockId=obloq_mqtt_callback_user block="on topic_0 received"
    function Obloq_mqtt_callback_user(cb) {
        Obloq_mqtt_callback(function () {
            var packet = new PacketaMqtt();
            packet.topic = OBLOQ_ANSWER_CMD;
            packet.message = OBLOQ_ANSWER_CONTENT;
            cb(packet);
        });
    }
    Obloq.Obloq_mqtt_callback_user = Obloq_mqtt_callback_user;
    /**
     * This is an MQTT listener callback function, which is very important.
     * The specific use method can refer to "example/ObloqMqtt.ts"
     */
    //% weight=180
    //% blockGap=60
    //% mutate=objectdestructuring
    //% mutateText=PacketaMqtt
    //% mutateDefaults="message:message"
    //% blockId=obloq_mqtt_callback_user_more block="on %top |received"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    //% advanced=true
    function Obloq_mqtt_callback_user_more(top, cb) {
        Obloq_mqtt_callback_more(top, function () {
            var packet = new PacketaMqtt();
            packet.topic = OBLOQ_ANSWER_CMD;
            packet.message = OBLOQ_ANSWER_CONTENT;
            cb(packet);
        });
    }
    Obloq.Obloq_mqtt_callback_user_more = Obloq_mqtt_callback_user_more;
    function Obloq_serial_recevice() {
        var size = obloqRxBufferedSize();
        //serial.writeNumber(size)
        if (size <= 5)
            return;
        var item = obloqreadString(size);
        //if (size > 10) {serial.writeString(item) }
        for (var i = 0; i < size; i++) {
            if (item.charAt(i) == '|') {
                continue;
                /////////////////////////////////////System api////////////////////////////////////////
            }
            else if (item.charAt(i) == '1') {
                if (item.charAt(i + 1) == '|') {
                    if (item.charAt(i + 2) == '1') { //|1|1|
                        OBLOQ_ANSWER_CMD = "PingOk";
                        OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                        return;
                    }
                    else if (item.charAt(i + 2) == '2') { //|1|2|version|
                        var z = 0;
                        var j = i + 4;
                        for (i = i + 4; i < size; i++) {
                            if (item.charAt(i) == '|') {
                                break;
                            }
                            else {
                                z = z + 1;
                            }
                        }
                        OBLOQ_ANSWER_CMD = "GetVersion";
                        OBLOQ_ANSWER_CONTENT = item.substr(j, z); //version
                        return;
                    }
                    else if (item.charAt(i + 2) == '3') { //|1|3|
                        if (OBLOQ_MQTT_INIT) {
                            OBLOQ_ANSWER_CMD = "Heartbeat";
                            OBLOQ_ANSWER_CONTENT = "OK";
                        }
                        return;
                    }
                }
                /////////////////////////////////////Wifi api////////////////////////////////////////
            }
            else if (item.charAt(i) == '2') {
                if (item.charAt(i + 1) == '|') {
                    if (item.charAt(i + 2) == '1') { //|2|1|
                        OBLOQ_ANSWER_CMD = "WifiDisconnect";
                        OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                        if (OBLOQ_MQTT_INIT || OBLOQ_HTTP_INIT || OBLOQ_WIFI_CONNECTED) {
                            OBLOQ_WRONG_TYPE = "wifi disconnect";
                        }
                        return;
                    }
                    else if (item.charAt(i + 2) == '2') { //|2|2|
                        OBLOQ_ANSWER_CMD = "WifiConnecting";
                        OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                        return;
                    }
                    else if (item.charAt(i + 2) == '3') { //|2|3|ip|
                        var z = 0;
                        var j = i + 4;
                        for (i = i + 4; i < size; i++) {
                            if (item.charAt(i) == '|') {
                                break;
                            }
                            else {
                                z = z + 1;
                            }
                        }
                        OBLOQ_ANSWER_CMD = "WifiConnected";
                        OBLOQ_ANSWER_CONTENT = item.substr(j, z); //IP addr
                        return;
                    }
                    else if (item.charAt(i + 2) == '4') { //|2|4|
                        OBLOQ_ANSWER_CMD = "WifiConnectFailure";
                        OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                        return;
                    }
                }
                /////////////////////////////////////Http api////////////////////////////////////////
            }
            else if (item.charAt(i) == '3') {
                if (item.charAt(i + 1) == '|') { //|3|errcode|message|
                    var z = 0;
                    var j = i + 2;
                    for (i = i + 2; i < size; i++) {
                        if (item.charAt(i) == '|') {
                            break;
                        }
                        else {
                            z = z + 1;
                        }
                    }
                    OBLOQ_ANSWER_CMD = item.substr(j, z);
                    z = 0;
                    j = i + 1;
                    for (i = i + 1; i < size; i++) {
                        if (item.charAt(i) == '|') {
                            break;
                        }
                        else {
                            z = z + 1;
                        }
                    }
                    OBLOQ_ANSWER_CONTENT = item.substr(j, z);
                    return;
                }
                /////////////////////////////////////Mqtt api////////////////////////////////////////
            }
            else if (item.charAt(i) == '4') { // serial.writeNumber(2);
                if (item.charAt(i + 1) == '|') {
                    if (item.charAt(i + 2) == '1') { //|4|1|1|1|
                        if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '1' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "MqttConneted";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '1' && //|4|1|1|2|reason|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "MqttConnectFailure";
                            var z = 0;
                            var j = i + 8;
                            for (i = i + 8; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                }
                                else {
                                    z = z + 1;
                                }
                            }
                            OBLOQ_ANSWER_CONTENT = item.substr(j, z);
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '2' && //|4|1|2|1|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "SubOk";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '2' && //|4|1|2|2|1|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|' &&
                            item.charAt(i + 8) == '1' &&
                            item.charAt(i + 9) == '|') {
                            OBLOQ_ANSWER_CMD = "SubCeiling";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '2' && //|4|1|2|2|2|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|' &&
                            item.charAt(i + 8) == '2' &&
                            item.charAt(i + 9) == '|') {
                            OBLOQ_ANSWER_CMD = "SubFailure";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '3' && //|4|1|3|1|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') { //led.plot(0, 1)
                            OBLOQ_ANSWER_CMD = "PulishOk";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '3' && //|4|1|3|2|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|') { //led.plot(0, 1)
                            OBLOQ_ANSWER_CMD = "PulishFailure";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            OBLOQ_WRONG_TYPE = "mqtt pulish failure";
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '4' && //|4|1|4|1|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "MqttDisconnected";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '4' && //|4|1|4|2|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "MqttDisconnectFailure";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '5' && //|4|1|5|
                            item.charAt(i + 5) == '|') {
                            var z = 0;
                            var j = i + 6;
                            for (i = i + 6; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                }
                                else {
                                    z = z + 1;
                                }
                            }
                            OBLOQ_ANSWER_CMD = item.substr(j, z);
                            z = 0;
                            j = i + 1;
                            for (i = i + 1; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                }
                                else {
                                    z = z + 1;
                                }
                            }
                            OBLOQ_ANSWER_CONTENT = item.substr(j, z); ///?????????
                            switch (OBLOQ_ANSWER_CMD) {
                                case OBLOQ_MQTT_TOPIC[0][0]:
                                    {
                                        if (OBLOQ_MQTT_CB[0] != null)
                                            obloqforevers(OBLOQ_MQTT_CB[0]);
                                    }
                                    break;
                                case OBLOQ_MQTT_TOPIC[1][0]:
                                    {
                                        if (OBLOQ_MQTT_CB[1] != null)
                                            obloqforevers(OBLOQ_MQTT_CB[1]);
                                    }
                                    break;
                                case OBLOQ_MQTT_TOPIC[2][0]:
                                    {
                                        if (OBLOQ_MQTT_CB[2] != null)
                                            obloqforevers(OBLOQ_MQTT_CB[2]);
                                    }
                                    break;
                                case OBLOQ_MQTT_TOPIC[3][0]:
                                    {
                                        if (OBLOQ_MQTT_CB[3] != null)
                                            obloqforevers(OBLOQ_MQTT_CB[3]);
                                    }
                                    break;
                                case OBLOQ_MQTT_TOPIC[4][0]:
                                    {
                                        if (OBLOQ_MQTT_CB[4] != null)
                                            obloqforevers(OBLOQ_MQTT_CB[4]);
                                    }
                                    break;
                            }
                            break;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '6' && //|4|1|6|1|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "UnSubOk";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '6' && //|4|1|6|2|1|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|' &&
                            item.charAt(i + 8) == '1' &&
                            item.charAt(i + 9) == '|') {
                            OBLOQ_ANSWER_CMD = "UnSubFailure";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' &&
                            item.charAt(i + 4) == '6' && //|4|1|6|2|2|
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|' &&
                            item.charAt(i + 8) == '2' &&
                            item.charAt(i + 9) == '|') {
                            OBLOQ_ANSWER_CMD = "UnSubFailure";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        /////////////////////////////////////Azure api////////////////////////////////////////
                    }
                    else if (item.charAt(i + 2) == '2') {
                        if (item.charAt(i + 3) == '|' && //|4|2|1|1|
                            item.charAt(i + 4) == '1' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "AzureCredentialCreatOk";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' && //|4|2|1|2|reason|
                            item.charAt(i + 4) == '1' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "AzureCredentialCreateFailure";
                            var z = 0;
                            var j = i + 8;
                            for (i = i + 8; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                }
                                else {
                                    z = z + 1;
                                }
                            }
                            OBLOQ_ANSWER_CONTENT = item.substr(j, z);
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' && //|4|2|2|1|
                            item.charAt(i + 4) == '2' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "AzureListenOk";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' && //|4|2|3|1|
                            item.charAt(i + 4) == '3' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "AzureSendOk";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' && //|4|2|3|2|
                            item.charAt(i + 4) == '3' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = OBLOQ_STR_TYPE_IS_NONE;
                            OBLOQ_ANSWER_CONTENT = "AzureSendFailure";
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' && //|4|2|4|1|
                            item.charAt(i + 4) == '4' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "AzureDestructionOk";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' && //|4|2|4|2|
                            item.charAt(i + 4) == '4' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '2' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "AzureDestructionFailure";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' && //|4|2|5|message|
                            item.charAt(i + 4) == '5' &&
                            item.charAt(i + 5) == '|') {
                            OBLOQ_ANSWER_CMD = "AzureReceiveOk";
                            var z = 0;
                            var j = i + 6;
                            for (i = i + 6; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                }
                                else {
                                    z = z + 1;
                                }
                            }
                            OBLOQ_ANSWER_CONTENT = item.substr(j, z);
                            return;
                        }
                        else if (item.charAt(i + 3) == '|' && //|4|2|6|1|
                            item.charAt(i + 4) == '6' &&
                            item.charAt(i + 5) == '|' &&
                            item.charAt(i + 6) == '1' &&
                            item.charAt(i + 7) == '|') {
                            OBLOQ_ANSWER_CMD = "AzureUnSubOk";
                            OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                            return;
                        }
                    }
                }
            }
            else if (item.charAt(i) == 't') {
                if (item.charAt(i + 1) == 'i' &&
                    item.charAt(i + 2) == 'm' &&
                    item.charAt(i + 3) == 'e' &&
                    item.charAt(i + 4) == 'o' &&
                    item.charAt(i + 5) == 'u' &&
                    item.charAt(i + 6) == 't') {
                    OBLOQ_ANSWER_CMD = "timeout";
                    OBLOQ_ANSWER_CONTENT = OBLOQ_STR_TYPE_IS_NONE;
                    return;
                }
            }
        }
        //serial.writeNumber(n);
        //serial.writeString("\r\n");
    }
    function onEvent() {
        if (!OBLOQ_SERIAL_INIT) {
            Obloq_serial_init();
        }
        OBLOQ_MQTT_EVENT = OBLOQ_BOOL_TYPE_IS_TRUE;
        //obloqClearRxBuffer()
        //obloqClearTxBuffer()
        //obloqEventAfter(1)
        obloqEventOn("\r");
        control.onEvent(32, 1, Obloq_serial_recevice); // register handler
    }
})(Obloq || (Obloq = {}));
