function Person(scene) {
    const HEAD_RADIUS = 10;
    const SHOULDER_Y = 35;
    const ARM_LENGTH = 25;
    const LEG_LENGTH = 30;
    const ASS_Y = 30;

    const center_x = LEG_LENGTH;

    self = new Container();

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

    scene.addChild(self);

    return self;
}
function Game_scene(pixi) {
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

    let player_one = Person(scene);
    let player_two = Person(scene);
    player_two.x = 500;

    scene.update = function (delta, now) {
        player_one.right_arm.rotation = Math.PI/4 + Math.sin(now/70) * 0.5;

        if(player_one.vx !== 0) {
            player_one.right_leg.rotation = Math.PI/3 + Math.sin(now/50) * 0.3;
            player_one.left_leg.rotation = -Math.PI/3 + Math.sin(now/50 + Math.PI/4) * 0.3;
        } else {
            player_one.right_leg.rotation = Math.PI/3;
            player_one.left_leg.rotation = -Math.PI/3;
        }

        player_one.x += player_one.vx;

        player_two.x -= 1;
        player_two.right_leg.rotation = Math.PI/3 + Math.sin(now/80) * 0.3;
        player_two.left_leg.rotation = -Math.PI/3 + Math.sin(now/80 + Math.PI/4) * 0.3;

        if(hitTestRectangle(player_one, player_two)) {
            select_scene(win_scene);
        }


        /*line.x += 1;
        if(line.x > 100) {
            select_scene(defeat_scene);
        }*/
    }

    scene.key_handler = function(key, isPress) {
        console.log("key:", key, "isPress:", isPress)
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
    }

    scene.select = () => {
        player_two.x = 500;
        player_one.x = 0;

        player_one.vx = 0;
        //line.x = 32;
        //line.y = 32;
        //line.vy = 50;
    };

    return scene;
}