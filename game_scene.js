function Person(scene) {
    const HEAD_RADIUS = 10;
    const SHOULDER_Y = 35;
    const ARM_LENGTH = 25;
    const LEG_LENGTH = 30;
    const ASS_Y = 30;

    const LEG_ANGLE = Math.PI/3;

    const center_x = LEG_LENGTH;

    self = new Container();

    self.grounded = false;

    self.vx = 0;
    self.vy = 0;

    self.right_leg = new Graphics()
        .lineStyle(4, 0xFFFFFF, 1)
        .moveTo(0, 0)
        .lineTo(LEG_LENGTH, 0);
    self.right_leg.x = center_x;
    self.right_leg.y = ASS_Y + SHOULDER_Y;
    self.right_leg.rotation = Math.PI/4;
    self.addChild(self.right_leg);

    self.left_leg = new Graphics()
        .lineStyle(4, 0xFFFFFF, 1)
        .moveTo(-LEG_LENGTH, 0)
        .lineTo(0, 0);
    self.left_leg.x = center_x;
    self.left_leg.y = ASS_Y + SHOULDER_Y;
    self.left_leg.rotation = -Math.PI/4;
    self.addChild(self.left_leg);

    self.right_arm = new Graphics()
        .lineStyle(4, 0xFFFFFF, 1)
        .moveTo(0, 0)
        .lineTo(ARM_LENGTH, 0);
    self.right_arm.x = center_x;
    self.right_arm.y = SHOULDER_Y;
    self.right_arm.rotation = Math.PI/4;
    self.addChild(self.right_arm);

    self.left_arm = new Graphics()
        .lineStyle(4, 0xFFFFFF, 1)
        .moveTo(-ARM_LENGTH, 0)
        .lineTo(0, 0);
    self.left_arm.x = center_x;
    self.left_arm.y = SHOULDER_Y;
    self.left_arm.rotation = -Math.PI/4;
    self.addChild(self.left_arm);

    self.head = new Graphics()
        .lineStyle(4, 0xFFFFFF, 1)
        .drawCircle(center_x, SHOULDER_Y/2, HEAD_RADIUS);

    self.addChild(self.head);

    self.update = (delta, now) => {
        if(self.vx !== 0) {
            self.right_leg.rotation = LEG_ANGLE + Math.sin(now/60) * 0.3;
            self.left_leg.rotation = -LEG_ANGLE + Math.sin(now/60 + Math.PI/4) * 0.3;
        } else {
            self.right_leg.rotation = LEG_ANGLE;
            self.left_leg.rotation = -LEG_ANGLE;
        }

        self.x += self.vx;
        self.y += self.vy;
    };

    scene.addChild(self);

    return self;
}
function Game_scene(pixi) {
    const ground_level = pixi.screen.height;
    const ground_height = 1;

    const margin = 100;

    let scene = new Container();

    /*let rectangle = new Graphics()
        .beginFill(0x66CCFF)
        .drawRect(10, 20, 30, 40)
        .endFill();*/

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

    let bounding_box = new Graphics()
        .beginFill(0xEEEEEE)
        .drawRect(0, 0, 10, 10)
        .endFill();
    // scene.addChild(bounding_box);

    let player_one = Person(scene);
    // let player_two = Person(scene);

    let cheat_box = Cheat_box(pixi);
    cheat_box.visible = false;
    cheat_box.x = pixi.screen.width/2 - cheat_box.width/2;
    cheat_box.y = pixi.screen.height/2 - cheat_box.height/2;
    scene.addChild(cheat_box);

    scene.update = function (delta, now) {
        player_one.update(delta, now);

        let y_diff = player_one.y - player_one.getBounds().y;

        if(player_one.getBounds().y + player_one.getBounds().height > ground_level) {
            // console.log("collision");
            player_one.vy = 0;
            self.grounded = true;

            player_one.y = ground_level - player_one.getBounds().height + y_diff;
        } else {
            player_one.vy += 1;
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
            if(player_one.grounded) {
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
            popup_scene(cheat_box);
        }
    }

    scene.select = () => {
        player_one.x = 0;
        // player_two.x = 500;

        player_one.vx = 0;

        player_one.y = ground_level - player_one.height - 200;
        // player_two.y = ground_level - player_two.height - ground_height/2;
        //line.x = 32;
        //line.y = 32;
        //line.vy = 50;
    };

    return scene;
}


function Cheat_box(pixi) {
    let scene = new Container();

    const margin_left = 50;

    let background = new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, 400, 60)
        .endFill();

    scene.addChild(background);

    let cursor = new Graphics()
        .beginFill(0xFFFFFF)
        .drawRect(10, 10, 20, 45)
        .endFill();

    scene.addChild(cursor);

    let message = new Text(">", DARK_STYLE_H1);
    message.position.set(0, 0);
    scene.addChild(message);

    let cheat_text = [];
    function add_letter(letter) {
        let message = new Text(letter, DARK_STYLE_H2);
        message.position.set(margin_left + cheat_text.length * 40, 10);
        message.letter = letter;
        
        scene.addChild(message);

        cheat_text.push(message);
    };
    function remove_letter() {
        let letter = cheat_text.pop();
        scene.removeChild(letter);
    }

    function clear_letter() {
        let code_length = cheat_text.length;
        for(let i = 0; i < code_length; i++) {
            remove_letter();
        }
    }

    scene.update = (delta, now) => {
        // console.log(Math.floor(now) % 2);
        cursor.visible = (Math.floor(now/500) % 2 > 0);
        cursor.x = margin_left + cheat_text.length * 40;
    };

    scene.key_handler = (key, isPress) => {
        if(isPress === true) {
            if(key === 13) { // pressed enter
                let cheat = cheat_text.map(item => item.letter).join("");
                console.log("cheat:", cheat);
                close_popup();
            }

            if(key === 8) {
                // console.log("delete character");
                remove_letter();
            }

            if(key > 46 && key < 91 || key === 32) {
                let char = String.fromCharCode(key);
                // console.log("press:", char);
                add_letter(char);
            }
        }
    };

    scene.select = () => {
        clear_letter();
    };

    return scene;
}