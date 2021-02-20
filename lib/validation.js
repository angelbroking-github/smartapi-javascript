    /**
     * Function to validate the order params
     * @method sanitize_Params
     */

exports.sanitize_Params = (params) => {
    let _params = Object.assign({}, params);

    var { tradingsymbol, exchange } = _params;
    
    if (tradingsymbol != undefined && exchange != undefined) {

        tradingsymbol = tradingsymbol.toUpperCase();
        exchange = exchange.toUpperCase();

        if ((exchange === 'NSE' || exchange == 'BSE') && tradingsymbol.slice(-3) !== '-EQ') {
            _params.tradingsymbol = `${tradingsymbol}-EQ`;
        }
    }
    
    return _params;
}