let update = () => {};
let key_handler = (key, isPress) => {};

let intro_scene, win_scene, game_scene, defeat_scene, cheat_box;

function app(pixi) {
    let stage = pixi.stage;

    PIXI.utils.sayHello("Drop to stack begin!");

    intro_scene = Intro_scene(pixi);
    intro_scene.visible = false;
    stage.addChild(intro_scene);

    win_scene = Win_scene(pixi);
    win_scene.visible = false;
    stage.addChild(win_scene);

    game_scene = Game_scene(pixi);
    game_scene.visible = false;
    stage.addChild(game_scene);

    defeat_scene = Defeat_scene(pixi);
    defeat_scene.visible = false;
    stage.addChild(defeat_scene);

    window.addEventListener(
        "keydown",
        (event) => {
            key_handler(event.keyCode, true);
            if(event.keyCode !== 116 && event.keyCode !== 122/* && event.keyCode !== 123*/) {
                event.preventDefault();
            }
        },
        false
    );

    window.addEventListener(
        "keyup",
        (event) => {
            key_handler(event.keyCode, false);
            event.preventDefault();
        },
        false
    );

    pixi.ticker.add(delta => update(delta, performance.now()));

    select_scene(intro_scene);
    // select_scene(game_scene);
}

let current_scene = null;
let back_scene = null;

function select_scene(scene, params) {
    if(current_scene !== null) {
        current_scene.visible = false;
    }
    scene.visible = true;
    current_scene = scene;

    update = scene.update;
    key_handler = scene.key_handler;
    scene.select(params);
}

function popup_scene(scene, params) {
    back_scene = current_scene;
    current_scene = scene;

    scene.visible = true;

    update = scene.update;
    key_handler = scene.key_handler;
    scene.select(params);
}
