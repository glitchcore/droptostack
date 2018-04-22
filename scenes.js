function Win_scene(pixi) {
    let scene = new Container();

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    {
        let message = new Text("Stack dropped", DARK_STYLE_H1);
        message.position.set(pixi.screen.width/2 - 200, 50);
        scene.addChild(message);
    }

    {
        let message = new Text("press ENTER to restart", DARK_STYLE_H2);
        message.position.set(pixi.screen.width/2 - 200, 150);
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
    
    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    {
        let message = new Text("You dropped", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - 200, 50);
        scene.addChild(message);
    }

    {
        let message = new Text("press ENTER to restart", DARK_STYLE_H2);
        message.position.set(pixi.screen.width/2 - 200, 150);
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