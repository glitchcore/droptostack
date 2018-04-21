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
        if(key === 13 && isPress === true) {
            select_scene(game_scene);
        }
    };

    scene.select = () => {};

    return scene;
}