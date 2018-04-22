function Game_scene(pixi) {
    const ground_level = pixi.screen.height;
    const ground_height = 1;

    const margin = 100;

    let cheat_mode = false;

    let scene = new Container();

    /*
    let rectangle = new Graphics()
        .beginFill(0x66CCFF)
        .drawRect(10, 20, 30, 40)
        .endFill();
    */

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();
    scene.addChild(background);

    let ground = new Graphics()
        .beginFill(0xCCCCCC)
        .drawRect(0, ground_level, pixi.screen.width, ground_height)
        .endFill();
    scene.addChild(ground);

    /*
    let bounding_box = new Graphics()
        .beginFill(0xEEEEEE)
        .drawRect(0, 0, 10, 10)
        .endFill();
    // scene.addChild(bounding_box);
    */

    {
        let message = new Text("Player one", DARK_STYLE_H4);
        message.position.set(10, 10);
        scene.addChild(message);
    }

    {
        let message = new Text("Player two", DARK_STYLE_H4);
        message.position.set(pixi.screen.width - 128, 10);
        scene.addChild(message);
    }

    let address_message = new Text("", DARK_STYLE_H2);
    scene.addChild(address_message);

    let player_one_life_bar = new Graphics()
        .beginFill(0xFFFFFF)
        .drawRect(0, 0, 200, 10)
        .endFill();
    scene.addChild(player_one_life_bar);

    player_one_life_bar.x = 10;
    player_one_life_bar.y = 40;

    let player_two_life_bar = new Graphics()
        .beginFill(0xFF0000)
        .drawRect(0, 0, -200, 10)
        .endFill();
    scene.addChild(player_two_life_bar);

    player_two_life_bar.x = pixi.screen.width - 10;
    player_two_life_bar.y = 40;

    let player_one_power_bar = new Graphics()
        .beginFill(0x55DDFF)
        .drawRect(0, 0, 100, 10)
        .endFill();
    scene.addChild(player_one_power_bar);

    player_one_power_bar.x = 10;
    player_one_power_bar.y = 60;

    let player_two_power_bar = new Graphics()
        .beginFill(0x55DDFF)
        .drawRect(0, 0, -100, 10)
        .endFill();
    scene.addChild(player_two_power_bar);

    player_two_power_bar.x = pixi.screen.width - 10;
    player_two_power_bar.y = 60;

    let player_one = Person(scene);
    let player_two = Person(scene);

    let cheat_box = Cheat_box(pixi);
    cheat_box.visible = false;
    cheat_box.x = pixi.screen.width/2 - cheat_box.width/2;
    cheat_box.y = pixi.screen.height/2 - cheat_box.height/2;
    scene.addChild(cheat_box);

    scene.update = function (delta, now) {
        // console.log("update");

        player_one.update(delta, now);
        player_two.update(delta, now);

        let y_diff_one = player_one.y - player_one.getBounds().y;

        if(player_one.getBounds().y + player_one.getBounds().height > ground_level) {
            // console.log("collision");
            player_one.vy = 0;
            self.grounded = true;

            player_one.y = ground_level - player_one.getBounds().height + y_diff_one;
        } else {
            player_one.vy += 1;
            self.grounded = false;
        }

        
        let y_diff_two = player_two.y - player_two.getBounds().y;

        if(player_two.getBounds().y + player_two.getBounds().height > ground_level) {
            // console.log("collision");
            player_two.vy = 0;
            self.grounded = true;

            player_two.y = ground_level - player_two.getBounds().height + y_diff_one;
        } else {
            player_two.vy += 1;
            self.grounded = false;
        }

        /*bounding_box.width = player_one.getBounds().width;
        bounding_box.height = player_one.getBounds().height;
        bounding_box.x = player_one.getBounds().x;
        bounding_box.y = player_one.getBounds().y;*/

        
        // player_one.right_arm.rotation = Math.PI/4 + Math.sin(now/70) * 0.5;
        // player_two.x -= 1;
        // player_two.right_leg.rotation = Math.PI/3 + Math.sin(now/80) * 0.3;
        // player_two.left_leg.rotation = -Math.PI/3 + Math.sin(now/80 + Math.PI/4) * 0.3;

        /*if(hitTestRectangle(player_one, player_two)) {
            select_scene(win_scene);
        }*/


        /*line.x += 1;
        if(line.x > 100) {
            select_scene(defeat_scene);
        }*/
    }

    scene.key_handler = function(key, isPress) {
        // console.log("key:", key, "isPress:", isPress)

        if(key === 39) {
            if(isPress) {
                console.log("set vx = 2");
                player_one.vx = 2;
            } else {
                player_one.vx = 0;
            }
        }

        if(key === 37) {
            if(isPress) {
                player_one.vx = -2;
            } else {
                player_one.vx = 0;
            }
        }

        if(key === 32 && isPress) {
            if(player_one.vy > -1) {
                player_one.vy = -10;
            } else {
                console.log("not grounded");
            }
        }

        if(key === 16) {
            if (isPress) {
                console.log("punch!");
                player_one.right_arm.rotation = 0;
                player_one.right_arm.width += 5;
            } else {
                player_one.right_arm.rotation = Math.PI/4;
                player_one.right_arm.width -= 5;
            }
        }

        if(key === 9 && isPress) {
            console.log("open cheat zone!");
            cheat_mode = true;
            popup_scene(cheat_box, {player_power: player_one_power_bar.scale.x});
        }
    }

    scene.select = (params) => {

        if(params && params.address) {
            address_message.setText("Address 0x" +  params.address);
            address_message.y = 10;
            address_message.x = pixi.screen.width/2 - address_message.getBounds().width/2;
        }
        

        player_one.vx = 0;
        player_two.vx = 0;

        if(cheat_mode) {
            let cheat = params.cheat;
            player_one_power_bar.scale.x = params.player_power;

            console.log("get cheat:", cheat);
            cheat_mode = false;

            if(cheat === "GROW") {
                player_one.scale.x = 2;
                player_one.scale.y = 2;
            }

            if(cheat === "WIN") {
                select_scene(win_scene);
            }

            if(cheat === "FLIP") {
                player_one.rotation += Math.PI/2;
            }

            return;
        }

        player_one.scale.x = 1;
        player_one.scale.y = 1;

        player_one.x = 0;
        player_two.x = 500;

        player_one.y = ground_level - player_one.height - 200;
        // player_two.y = ground_level - player_two.height - 200;

        player_one_power_bar.scale.x = 1.0;
        player_one_life_bar.scale.x = 1.0;

        player_two_power_bar.scale.x = 1.0;
        player_two_life_bar.scale.x = 1.0;
    };

    return scene;
}
