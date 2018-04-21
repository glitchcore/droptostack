function Intro_scene(pixi) {
    let scene = new Container();

    {
        let message = new Text("Drop to stack!");
        message.position.set(5, 5);
        scene.addChild(message);
    }

    {
        let message = new Text("Enter you code / press ENTER");
        message.position.set(5, 20);
        scene.addChild(message);
    }

    let cursor = new Graphics()
        .beginFill(0x000000)
        .drawRect(10, 55, 10, 20)
        .endFill();

    scene.addChild(cursor);

    let code_text = [];
    function add_letter(letter) {
        let message = new Text(letter);
        message.position.set(code_text.length * 20, 50);
        message.letter = letter;
        
        scene.addChild(message);

        code_text.push(message);
    };
    function remove_letter() {
        let letter = code_text.pop();
        scene.removeChild(letter);
    }

    scene.update = (delta, now) => {
        // console.log(Math.floor(now) % 2);
        cursor.visible = (Math.floor(now/500) % 2 > 0);
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
                console.log("code:", code)
                select_scene(game_scene, code);
            }

            if(key === 8) {
                // console.log("delete character");
                remove_letter();
                cursor.x = code_text.length * 20;
            }

            if(key > 46 && key < 91 || key === 32) {
                let char = String.fromCharCode(key);
                // console.log("press:", char);
                add_letter(char);
                cursor.x = code_text.length * 20;
            }
        }
    };

    scene.select = () => {};

    return scene;
}