function Game_scene(pixi) {
    let scene = new Container();

    let rectangle = new Graphics()
        .beginFill(0x66CCFF)
        .drawRect(10, 20, 30, 40)
        .endFill();

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();
    scene.addChild(background);

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