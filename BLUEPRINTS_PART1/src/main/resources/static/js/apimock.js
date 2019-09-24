var apimok = (function () {

    var mockdata = [];

    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 10,
                    y: 20
                },
                {
                    x: 15,
                    y: 25
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "gear",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        }
    ];

    return {
        getBlueprintsByAuthor:function(name, callback) {
            callback(
                mockdata[name]
            );
        }
    }

})();