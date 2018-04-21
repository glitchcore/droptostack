function Win_scene(pixi) {
    let scene = new Container();

    {
        let message = new Text("Stack dropped");
        message.position.set(5, 5);
        scene.addChild(message);
    }

    {
        let message = new Text("press ENTER to restart");
        message.position.set(5, 20);
        scene.addChild(message);
    }

    scene.update = () => {};

    scene.key_handler = (key, isPress) => {
        if(key === 13 && isPress === true) {
            select_scene(intro_scene);
        }
    };

    scene.select = () => {};

    return scene;
}

function Defeat_scene(pixi) {
    let scene = new Container();

    {
        let message = new Text("You dropped");
        message.position.set(5, 5);
        scene.addChild(message);
    }

    {
        let message = new Text("press ENTER to restart");
        message.position.set(5, 20);
        scene.addChild(message);
    }

    scene.update = () => {};

    scene.key_handler = (key, isPress) => {
        if(key === 13 && isPress === true) {
            select_scene(intro_scene);
        }
    };

    scene.select = () => {};

    return scene;
}