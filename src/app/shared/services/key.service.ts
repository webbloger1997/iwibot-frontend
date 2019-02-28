export let cryptoMod = (function () {

    let secret_key = {}; // the AES secret key object
    let session_identifier = ""; // session identifier associated with the secret key

    if (!("TextEncoder" in window))
        alert("Sorry, this browser does not support TextEncoder...");

    let encoder = new TextEncoder(); // always utf-8

    function hex2buf(hex) { // hex is a hex string
        var view = new Uint8Array(hex.length / 2);
        for (var i = 0; i < hex.length; i += 2) {
            view[i / 2] = parseInt(hex.substring(i, i + 2), 16);
        }
        return view.buffer;
    }

    function buf2hex(buffer) { // buffer is an ArrayBuffer
        return Array.prototype.map.call(
            new Uint8Array(buffer),
            x => ('00' + x.toString(16)).slice(-2)
        ).join('');
    }

    function importSecretAesKey(keyData, session_id) {
        session_identifier = session_id;
        return window.crypto.subtle.importKey(
            "raw", //can be "jwk" or "raw"
            keyData, // "raw" would be an ArrayBuffer
            "AES-CBC",
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
        );
    }

    function encryptPlaintextWithAes(data, aesKey) {
        var ivec = window.crypto.getRandomValues(new Uint8Array(16));
        console.log("AES key: ", aesKey);
        return window.crypto.subtle.encrypt({
                    name: "AES-CBC",
                    //Don't re-use initialization vectors!
                    //Always generate a new iv every time your encrypt!
                    iv: ivec,
                },
                aesKey, //from generateKey or importKey above
                data //ArrayBuffer of data you want to encrypt
            )
            .then(function (encrypted) {
                console.log("encrypted: ", encrypted);
                console.log("encrypted2: ", buf2hex(new Uint8Array(encrypted)));
                return {
                    "iv": buf2hex(ivec),
                    "encrypted": buf2hex(new Uint8Array(encrypted)),
                    "sid": session_identifier
                };
            });
    }

    return { // public part of the module

        initCryptoKey: function (keyData, session_id) {
            console.log("Setting session identifier to " + session_id);
            console.log("Setting crypto key to " + keyData);
            importSecretAesKey(hex2buf(keyData), session_id)
                .then(key => secret_key = key);
        },

        createEncryptedJsonMessage: function (plaintext) {
            console.log("Plaintext: ", plaintext);
            let data = encoder.encode(plaintext);
            console.log("Data: ", data);
            return encryptPlaintextWithAes(data, secret_key)
                .then(msg => Promise.resolve(JSON.stringify(msg)));
        }
    };
})();

let demoPageMod = (function () {
    return { // public part of the module
        sendCryptoMsg: function () {
            let plaintext = $("#plaintext").val();
            cryptoMod.createEncryptedJsonMessage(plaintext)
                .then(msgJson =>
                    $.ajax({
                        type: "POST",
                        url: "/requests",
                        data: msgJson,
                        contentType: 'application/json; charset=UTF-8',
                        success: msg => $("#answer").text(JSON.stringify(msg, null, '\t'))
                    }));
        }
    };
})();

$(function () { // call this function after the page has loaded
    console.log("WebCrypto init");
    // $.get("./secret.aes", cryptoMod.initCryptoKey); // use key from local sever instead of openwhisk action
    $.get(
        "https://us-south.functions.cloud.ibm.com/api/v1/web/IWIbot_dev/IWIBot/Keys.json",
        (msg) => cryptoMod.initCryptoKey(msg.payload.crypto_key, msg.payload.sid)
    );
    $("#encrypt").on("click", () => demoPageMod.sendCryptoMsg());
});