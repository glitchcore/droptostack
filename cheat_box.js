function Cheat_box(pixi) {
    let scene = new Container();

    const WIDTH = 400;

    const margin_left = 50;

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, WIDTH, 60)
        .endFill();

    scene.addChild(background);

    let cursor = new Graphics()
        .beginFill(0xFFFFFF)
        .drawRect(10, 15, 20, 45)
        .endFill();

    scene.addChild(cursor);

    let player_power_bar = new Graphics()
        .beginFill(0x55DDFF)
        .drawRect(0, 00, WIDTH, 10)
        .endFill();
    scene.addChild(player_power_bar);

    let message = new Text(">", DARK_STYLE_H1);
    message.position.set(0, 0);
    scene.addChild(message);

    let cheat_text = [];
    function add_letter(letter) {
        let message = new Text(letter, DARK_STYLE_H2);
        message.position.set(margin_left + cheat_text.length * 40, 15);
        message.letter = letter;
        
        scene.addChild(message);

        cheat_text.push(message);
    };
    function remove_letter() {
        let letter = cheat_text.pop();
        scene.removeChild(letter);
    }

    function clear_letter() {
        let code_length = cheat_text.length;
        for(let i = 0; i < code_length; i++) {
            remove_letter();
        }
    }

    scene.update = (delta, now) => {
        // console.log(Math.floor(now) % 2);
        cursor.visible = (Math.floor(now/500) % 2 > 0);
        cursor.x = margin_left + cheat_text.length * 40;

        player_power_bar.scale.x -= delta/1000;
    };

    scene.key_handler = (key, isPress) => {
        if(isPress === true) {
            if(key === 13) { // pressed enter
                let cheat = cheat_text.map(item => item.letter).join("");
                console.log("cheat:", cheat);
                select_scene(game_scene, {
                    cheat,
                    player_power: player_power_bar.scale.x
                });
            }

            if(key === 8) {
                // console.log("delete character");
                remove_letter();
            }

            if(key > 46 && key < 91 || key === 32) {
                let char = String.fromCharCode(key);
                // console.log("press:", char);
                add_letter(char);
            }
        }
    };

    scene.select = (params) => {
        player_power_bar.scale.x = params.player_power;
        clear_letter();
    };

    return scene;
}