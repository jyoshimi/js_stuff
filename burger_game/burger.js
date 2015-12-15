var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });
var score = 0;

// TODO: Increase difficulty as time passes
// - One reload is needed before it can be played
//  - Add patty
// - Add rules for "burger creation"

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#ffffff';

    // The "ground"
    var endData = [
        '2222'
    ];
    game.create.texture('endTexture', endData, 1, 1, 1);

    // var style = { font: "10px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: sprite.width, align: "center" };
    scoreText = game.add.text(140, 20, "Score: ");
    scoreText.anchor.set(0.5);

    var bunData = [
        '...........',
        '...........',
        '...........',
        '...........',
        '.........',
        '7777777777.',
        '..7777777..',
        '...........',
        '...........',
        '...........',
        '...........'
    ];
    game.create.texture('bun', bunData, 6, 6, 0);

    var lettuceData = [
        '...........',
        '...........',
        '...........',
        '...........',
        '.BBBBBBB.',
        'BBBBBBBBBB.',
        '..BBBBBBB..',
        '...........',
        '...........',
        '...........',
        '...........'
    ];
    game.create.texture('lettuce', lettuceData, 6, 6, 0);

    var playerData = [
        '...88CC8......',
        '...8E7E7......',
        '...87E77......',
        '..884EEE4.....',
        '..888E4EE111EE',
        '..E.8444E.....',
        '..E.E84EE.....',
        '..E.EEEEE.....',
        '..E.4EEE4.....',
        '.CCCEEEEE.....',
        '.EEEE44EE.....',
        '.EEEE44EE.....',
        '.EEEEEEEE.....',
        'EEEE4EEE4.....'
    ];
    game.create.texture('player', playerData, 6, 6, 0);

    // var playerData = [
    //     '..4.4.........',
    //     '..444.........',
    //     '..777....11111',
    //     '.333333....5..',
    //     '533443355555..',
    //     '.344443.......',
    //     '.334433.......',
    //     '.345545.......',
    //     '..5.5.5.......',
    //     '..5.5.5.......',
    //     '..5.5.5.......',
    //     '..5.5.5.......',
    //     '..5.5.5.......',
    //     '..4.5.4.......'
    // ];
    //game.create.texture('player', playerData, 6, 6, 0);

    // var playerData = [
    //         '..............',
    //         '...88888......',
    //         '..8.1818......',
    //         '..8.2A28......',
    //         '.8..A2A8......',
    //         '....55........',
    //         '466666........',
    //         '...666665EEEEE',
    //         '...6666.......',
    //         '...DDDD.......',
    //         '...DDDD.......',
    //         '...5.5........',
    //         '...7.7........',
    //         '..77.77.......'
    //     ];
    // game.create.texture('player', playerData, 6, 6, 1);

    //  Now we've got our textures let's just make some sprites

    var end = game.add.sprite(0, 600-64, 'endTexture');
    end.width = 800;
    end.height = 64;

    // List of visible foods
    //  If above a level, add one
    //  when hits bottom, remove it
    //
    foods = game.add.physicsGroup();

    // var x = 20;
    // foods = game.add.physicsGroup();
    // for (var i = 0; i < 4; i++)
    // {
    //     var food = foods.create(game.world.randomX, y, 'bun');
    //     food.body.velocity.y = game.rnd.between(100, 300);
    //     x += 48;
    // }


    var y = 80;

    player = game.add.sprite(400, 510, 'player');
    player.anchor.set(0.5);

    game.physics.arcade.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    // Make falling foods
    if (Math.random() > .980) {
        var choice = Math.floor(Math.random() * 2) + 1;
        var food;
        if (choice == 1) {
            food = foods.create(game.world.randomX, 1, 'bun');
        } else {
            food = foods.create(game.world.randomX, 1, 'lettuce');
        }
        food.body.velocity.y = game.rnd.between(100, 300);
    }
    game.physics.arcade.overlap(player, foods, collisionHandler, null, this);


    checkForUncaughtFood(foods);


    // Player movement
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    wrap(player)
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;
        player.scale.x = -1;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;
        player.scale.x = 1;
    }

    if (cursors.up.isDown)
    {
        // player.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        // player.body.velocity.y = 200;
    }

}

function checkForUncaughtFood(foods) {

    for (var i = 0; i < foods.children.length; i++) {
        food = foods.children[i]
        // console.log(foods)
        if (food.y > 750) {
            foods.remove(food);
            score -= .5;
            updateScore();
            // console.log(foods.children.length);
        }
    }
}

// Wrap player to left and right
function wrap(player) {
    if (player.x > 800)
    {
        player.x = 0;
    } else if (player.x < 0) 
    {
        player.x = 800;
    }
}

function updateScore() {
    if (score < 0) {
        //alert("GAME OVER!");
        score = 0;
    }; 
    scoreText.text = "Score:" + score;
}

function collisionHandler(player, food) {

    player.addChild(food);
    food.body.velocity.y = 0;
    score += 1;
    updateScore();
}