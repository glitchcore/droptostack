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

function Game_scene(pixi) {
    let scene = new Container();

    let rectangle = new Graphics()
        .beginFill(0x66CCFF)
        .drawRect(10, 20, 30, 40)
        .endFill();

    scene.addChild(rectangle);

    let line = new Graphics()
        .lineStyle(4, 0xCCCCCC, 1)
        .moveTo(0, 0)
        .lineTo(80, 50);

    
    scene.addChild(line);

    scene.update = function (delta) {
        line.x += 1;
        if(line.x > 100) {
            select_scene(defeat_scene);
        }
    }

    scene.key_handler = function(key, isPress) {
        if(key === 37 && isPress === true) {
            line.rotation += 0.1;
        }

        if(key === 39 && isPress === true) {
            line.rotation -= 0.1;
        }
    }

    scene.select = () => {
        line.x = 32;
        line.y = 32;
        line.vy = 50;
    };

    return scene;
}

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