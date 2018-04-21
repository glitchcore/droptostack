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

    scene.update = () => {};

    scene.key_handler = (key, isPress) => {
        if(isPress === true) {
            if(key === 13) { // pressed enter
                select_scene(game_scene);
            }

            if(key === 8) {
                console.log("delete character");
            }

            if(key > 46 && key < 91) {
                console.log("press:", String.fromCharCode(key));
            }
        }
    };

    scene.select = () => {};

    return scene;
}