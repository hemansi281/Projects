reqUserJoined - Req: AB
reqRollDice - Req: empty

resStart - Res: { "user": [
        {
            "id": "o45YxL4AUzxsWXGDAAAB",
            "name": "AB"
        }
    ],
    "currPlayer": "AB"
}

resError - Res: { message: "Need at least 2 players" } or { message: "Wait, Not your turn!" }

resMove - Res: {
    "player": "AB",
    "diceNum": 1,
    "newPosition": 1,
    "started": true
}

resWinner - Res: {
    "player": "AB",
    "diceNum" : 1,
    "newPosition": 100,
    "winner": true
}

resPlayerLeft - Res: {
    "message": "AB left the game",
    "players": [
        {
            "id": "vNWMo6aOhoyBgrMcAAAF",
            "name": "User3"
        }
    ]
}

resGameOver - Res: {
    "message": "Not enough players to continue!"
}