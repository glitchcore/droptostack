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

    let cheat_box = Cheat_box(pixi);
    cheat_box.visible = false;
    cheat_box.x = pixi.screen.width/2 - cheat_box.width/2;
    cheat_box.y = pixi.screen.height/2 - cheat_box.height/2;
    scene.addChild(cheat_box);

    /*
    let bounding_box_one = new Graphics()
        .beginFill(0x333333)
        .drawRect(0, 0, 10, 10)
        .endFill();
    scene.addChild(bounding_box_one);

    let bounding_box_two = new Graphics()
        .beginFill(0x333333)
        .drawRect(0, 0, 10, 10)
        .endFill();
    scene.addChild(bounding_box_two);
    */

    let player_one = Person(scene, 0xFFFFFF);
    let player_two = Person(scene, 0xFF0000);
    

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

    player_one.life_bar = new Graphics()
        .beginFill(0xFFFFFF)
        .drawRect(0, 0, 200, 10)
        .endFill();
    scene.addChild(player_one.life_bar);

    player_one.life_bar.x = 10;
    player_one.life_bar.y = 40;

    player_two.life_bar = new Graphics()
        .beginFill(0xFF0000)
        .drawRect(0, 0, -200, 10)
        .endFill();
    scene.addChild(player_two.life_bar);

    player_two.life_bar.x = pixi.screen.width - 10;
    player_two.life_bar.y = 40;

    player_one.power_bar = new Graphics()
        .beginFill(0x55DDFF)
        .drawRect(0, 0, 100, 10)
        .endFill();
    scene.addChild(player_one.power_bar);

    player_one.power_bar.x = 10;
    player_one.power_bar.y = 60;

    player_two.power_bar = new Graphics()
        .beginFill(0x55DDFF)
        .drawRect(0, 0, -100, 10)
        .endFill();
    scene.addChild(player_two.power_bar);

    player_two.power_bar.x = pixi.screen.width - 10;
    player_two.power_bar.y = 60;

    
    ai_person(
            pixi,
            player_two, player_two.getBounds(),
            player_one, player_one.getBounds()
    );
    

    scene.update = function (delta, now) {
        let bounds_one = player_one.getBounds();
        let bounds_two = player_two.getBounds();

        
        
        update_person(pixi, player_one, bounds_one, player_two, bounds_two, ground_level);
        update_person(pixi, player_two, bounds_two, player_one, bounds_one, ground_level);

        if(player_two.life_bar.scale.x < 0) {
            select_scene(win_scene, address_message.text);
        }

        if(player_one.life_bar.scale.x < 0) {
            select_scene(defeat_scene, address_message.text);
        }
        
        /*
        bounding_box_one.width = bounds_one.width;
        bounding_box_one.height = bounds_one.height;
        bounding_box_one.x = bounds_one.x;
        bounding_box_one.y = bounds_one.y;

        bounding_box_two.width = bounds_two.width;
        bounding_box_two.height = bounds_two.height;
        bounding_box_two.x = bounds_two.x;
        bounding_box_two.y = bounds_two.y;
        */

        player_one.update(delta, now);
        player_two.update(delta, now);
    }

    scene.key_handler = function(key, isPress) {
        // console.log("key:", key, "isPress:", isPress)

        if(isPress && key === 39) {
            player_one.fx = 6;
        }

        if(isPress && key === 37) {
            player_one.fx = -6;
        }

        if(!isPress && key === 39 && player_one.fx > 0) {
            player_one.fx = 0;
        }

        if(!isPress && key === 37 && player_one.fx < 0) {
            player_one.fx = 0;
        }

        if(key === 32 && isPress) {
            player_one.fy = -25;
        }

        if(key === 16) {
            if (isPress) {
                console.log("punch!");
                if(player_one.x < player_two.x) {
                    player_one.right_arm.rotation = 0;
                    player_one.right_arm.scale.x = 1.5 * player_one.arm_scale;
                } else {
                    player_one.left_arm.rotation = 0;
                    player_one.left_arm.scale.x = 1.5 * player_one.arm_scale;
                }
            } else {
                player_one.right_arm.rotation = Math.PI/4;
                player_one.left_arm.rotation = -Math.PI/4;
                player_one.left_arm.scale.x = 1;
                player_one.right_arm.scale.x = 1;
            }
        }

        if(key === 9 && isPress) {
            if(player_one.power_bar.scale.x > 0) {
                console.log("open cheat zone!");
                cheat_mode = true;
                popup_scene(cheat_box, {player_power: player_one.power_bar.scale.x});
            } else {
                address_message.text ="TO0 LO W   ENER GY"
            }
        }
    }

    scene.select = (params) => {

        if(params && params.address) {
            address_message.text = "Address " +  params.address;
            address_message.y = 10;
            address_message.x = pixi.screen.width/2 - address_message.getBounds().width/2;
        }

        init_person(player_one);
        init_person(player_two);

        // player_two.scale.x = 1.8;
        // player_two.scale.y = 1.8;

        if(cheat_mode) {
            let cheat = params.cheat;
            player_one.power_bar.scale.x = params.player_power;

            console.log("get cheat:", cheat);
            cheat_mode = false;

            if(cheat === "UNGROW") {
                player_one.scale.x = 0.4;
                player_one.scale.y = 0.4;
            }

            if(cheat === "WIN") {
                select_scene(defeat_scene, address_message.text);
            }

            if(cheat === "FLIP") {
                player_one.fy = -50;
            }

            if(cheat === "SIMPLE") {
                player_one.arm_scale = 3;
            }

            return;
        }

        player_one.right_arm.rotation = Math.PI/4;
        player_one.right_arm.scale.x = 1;
        player_one.left_arm.rotation = -Math.PI/4;
        player_one.left_arm.scale.x = 1;

        player_two.right_arm.rotation = Math.PI/4;
        player_two.right_arm.scale.x = 1;
        player_two.left_arm.rotation = -Math.PI/4;
        player_two.left_arm.scale.x = 1;

        player_one.x = 0;
        player_two.x = 500;

        player_one.y = ground_level - player_one.height - 200;
        player_two.y = ground_level - player_two.height - 200;

        player_one.power_bar.scale.x = 1.0;
        player_one.life_bar.scale.x = 1.0;

        player_two.power_bar.scale.x = 1.0;
        player_two.life_bar.scale.x = 1.0;

        player_one.rotation = 0;
        player_two.rotation = 0;

        player_one.arm_scale = 1;
    };

    return scene;
}
