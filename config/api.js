module.exports.API = {
    "root": "https://apiconnect.angelbroking.com",
    "open": "https://margincalculator.angelbroking.com",
    "login": "https://smartapi.angelbroking.com/publisher-login",
    "debug": false,
    "timeout": 7000,

    "user_login": "/rest/auth/angelbroking/user/v1/loginByPassword",
    "generate_token": "/rest/auth/angelbroking/jwt/v1/generateTokens",
    "get_profile": "/rest/secure/angelbroking/user/v1/getProfile",
    "logout": "/rest/secure/angelbroking/user/v1/logout",

    "order_place": "/rest/secure/angelbroking/order/v1/placeOrder",
    // "order_status": "/order-service/rest/secure/angelbroking/order/v1/orderStatus",
    "order_get_book": "/rest/secure/angelbroking/order/v1/getOrderBook",
    "order_modify": "/rest/secure/angelbroking/order/v1/modifyOrder",
    "order_cancel": "/rest/secure/angelbroking/order/v1/cancelOrder",

    "get_tradebook": "/rest/secure/angelbroking/order/v1/getTradeBook",
    "get_rms": "/rest/secure/angelbroking/user/v1/getRMS",
    "get_holding": "/rest/secure/angelbroking/portfolio/v1/getHolding",
    "get_position": "/rest/secure/angelbroking/order/v1/getPosition",
    "covert_position": "/rest/secure/angelbroking/order/v1/convertPosition",
    "get_all_instrument_list":"/OpenAPI_File/files/OpenAPIScripMaster.json"
    // "api.token": "/session/token",
    // "api.token.invalidate": "/session/token",
    // "api.token.renew": "/session/refresh_token",

    // "user.margins": "/user/margins",
    // "user.margins.segment": "/user/margins/{segment}",

    // "orders": "/orders",
    // "trades": "/trades",
    // "order.info": "/orders/{order_id}",
    // "order.place": "/orders/{variety}",
    // "order.modify": "/orders/{variety}/{order_id}",
    // "order.cancel": "/orders/{variety}/{order_id}",
    // "order.trades": "/orders/{order_id}/trades",
}