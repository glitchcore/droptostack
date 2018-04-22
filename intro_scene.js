function Intro_scene(pixi) {
    let scene = new Container();

    const margin_left = 250;

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);


    {
        let message = new Text("D Я O P  T 0  S T A C K", DARK_STYLE_H1);
        message.position.set(pixi.screen.width/2 - margin_left, 50);
        scene.addChild(message);
    }

    {
        let message = new Text("Enter your code / press ENTER", DARK_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left, 150);
        scene.addChild(message);
    }

    {
        let message = new Text("a r r o w  to move", DARK_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left, 300);
        scene.addChild(message);
    }
    {
        let message = new Text("T A B  to cheat", DARK_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left, 350);
        scene.addChild(message);
    }
    {
        let message = new Text("S H I F T  to punch", DARK_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left, 400);
        scene.addChild(message);
    }
    {
        let message = new Text("S P A C E   to jump", DARK_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left, 450);
        scene.addChild(message);
    }

    let cursor = new Graphics()
        .beginFill(0xFFFFFF)
        .drawRect(10, 210, 20, 45)
        .endFill();

    scene.addChild(cursor);

    let code_text = [];
    function add_letter(letter) {
        let message = new Text(letter, DARK_STYLE_H2);
        message.position.set(pixi.screen.width/2 - margin_left + code_text.length * 40, 200);
        message.letter = letter;
        
        scene.addChild(message);

        code_text.push(message);
    };
    function remove_letter() {
        let letter = code_text.pop();
        scene.removeChild(letter);
    }

    function clear_letter() {
        let code_length = code_text.length;
        for(let i = 0; i < code_length; i++) {
            remove_letter();
        }
    }

    scene.update = (delta, now) => {
        // console.log(Math.floor(now) % 2);
        cursor.visible = (Math.floor(now/500) % 2 > 0);
        cursor.x = code_text.length * 40 + pixi.screen.width/2 - margin_left;
        /*if(cursor.visible === true) {
             false;
        } else {
            cursor.visible = true;
        }*/
    };

    scene.key_handler = (key, isPress) => {
        if(isPress === true) {
            if(key === 13) { // pressed enter
                let code = code_text.map(item => item.letter).join("");
                if(code === "") {
                    code = "0XBEGIN";
                }

                console.log(code, "->", CHEATS["Address " + code]);

                if(!CHEATS["Address " + code]) {
                    console.log("no such code");
                    select_scene(defeat_scene, {address: null});
                } else {
                    console.log("code:", code);
                    select_scene(game_scene, {address:code});
                }
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

    scene.select = () => {
        clear_letter();
    };

    return scene;
}