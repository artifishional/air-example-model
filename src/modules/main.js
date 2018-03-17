export default [ "main",
    [ "state", {type: "container"},
        [ {type: "loto20_80"}, { source: {path: "./state.js", name: "loto20_80"} } ]
    ],
    [ "session",
        [ "games", {type: "container"},
            [ {name: "keno"}, {source: { path: "./keno.js"}} ],
            [ {name: "lucky"}, {source: { path: "./lucky.js"}} ],
        ],
        [ "switch", { source: "./gs.js" } ],
        [ "gs", {
            //source: Switch,
            links: [{ name: "item", path: "../games" }, { name: "switch", path: "../games" }]
        }]
    ],
];