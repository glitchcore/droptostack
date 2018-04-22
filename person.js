function Person(scene, color) {
    const HEAD_RADIUS = 10;
    const SHOULDER_Y = 35;
    const ARM_LENGTH = 25;
    const LEG_LENGTH = 30;
    const ASS_Y = 30;

    const LINE_WIDTH = 8;

    const LEG_ANGLE = Math.PI/3;

    const center_x = LEG_LENGTH;

    let self = new Container();

    self.grounded = false;

    self.vx = 0;
    self.vy = 0;

    self.fx = 0;

    self.right_leg = new Graphics()
        .lineStyle(LINE_WIDTH, color, 1)
        .moveTo(0, 0)
        .lineTo(LEG_LENGTH, 0);
    self.right_leg.x = center_x;
    self.right_leg.y = ASS_Y + SHOULDER_Y;
    self.right_leg.rotation = Math.PI/4;
    self.addChild(self.right_leg);

    self.left_leg = new Graphics()
        .lineStyle(LINE_WIDTH, color, 1)
        .moveTo(-LEG_LENGTH, 0)
        .lineTo(0, 0);
    self.left_leg.x = center_x;
    self.left_leg.y = ASS_Y + SHOULDER_Y;
    self.left_leg.rotation = -Math.PI/4;
    self.addChild(self.left_leg);

    self.right_arm = new Graphics()
        .lineStyle(LINE_WIDTH, color, 1)
        .moveTo(0, 0)
        .lineTo(ARM_LENGTH, 0);
    self.right_arm.x = center_x;
    self.right_arm.y = SHOULDER_Y;
    self.right_arm.rotation = Math.PI/4;
    self.addChild(self.right_arm);

    self.left_arm = new Graphics()
        .lineStyle(LINE_WIDTH, color, 1)
        .moveTo(-ARM_LENGTH, 0)
        .lineTo(0, 0);
    self.left_arm.x = center_x;
    self.left_arm.y = SHOULDER_Y;
    self.left_arm.rotation = -Math.PI/4;
    self.addChild(self.left_arm);

    self.head = new Graphics()
        .lineStyle(LINE_WIDTH, color, 1)
        .drawCircle(center_x, SHOULDER_Y/2, HEAD_RADIUS);

    self.addChild(self.head);

    self.arm_scale = 1;

    self.update = (delta, now) => {

        if(self.vx !== 0 && Math.abs(self.vy) < 0.5) {
            self.right_leg.rotation = LEG_ANGLE + Math.sin(now/200 * self.vx) * 0.3;
            self.left_leg.rotation = -LEG_ANGLE + Math.sin(now/200 * self.vx + Math.PI/5) * 0.3;
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


function update_person(pixi, player, player_bounds, foreign, foreign_bounds, ground_level) {
    /* fly movement */

    let y_diff = player.y - player_bounds.y;

    if(player_bounds.y + player_bounds.height > ground_level) {
        player.y = ground_level - player_bounds.height + y_diff + 1;
        player.vy = player.fy;
    } else {
        player.vy += 1.5;
    }
    player.fy = 0;

    /* horizontal movement */
    if(
        (player.fx > 0 && (foreign_bounds.x - (player_bounds.x + player_bounds.width)) > 0.1) ||
        (player.fx < 0 && (player_bounds.x - (foreign_bounds.x + foreign_bounds.width)) > 0.1)
    ) {
        
    } else {
        player.vx = 0;
    }

    player.vx = player.fx;

    if(hitTestRectangle(player_bounds, foreign_bounds)) {
        if(player.fx < 0 && (foreign_bounds.x < player_bounds.x)) {
            player.vx = 0;
        }

        if(player.fx > 0 && (player_bounds.x < foreign_bounds.x)) {
            player.vx = 0;
        }

        if(
            Math.abs(player_bounds.x - foreign_bounds.x) < player_bounds.width/2
        ) {
            if(player_bounds.y > foreign_bounds.y) {
                player.vy = 0;
                /*
                if(player_bounds.x > pixi.screen.width/2) {
                    player.vx -= 8;
                    player.x -= 35;

                    foreign.vx += 8;
                    foreign.x += 35;
                } else {
                    player.vx += 8;
                    player.x += 35;

                    foreign.vx -= 8;
                    foreign.x -= 35;
                }
                */
            }
        }
    }

    /* hit */
    if(
        hitTestRectangle(player.left_arm.getBounds(), foreign_bounds) &&
        player.left_arm.rotation == 0
    ) {
        foreign.life_bar.scale.x -= 0.02 * player.arm_scale;
        player.left_arm.rotation = Math.PI/20;
        console.log("hit!");
    }

    if(
        hitTestRectangle(player.right_arm.getBounds(), foreign_bounds) &&
        player.right_arm.rotation == 0
    ) {
        foreign.life_bar.scale.x -= 0.02 * player.arm_scale;
        player.right_arm.rotation = -Math.PI/20;
        console.log("hit!");
    }
}

function init_person(player) {
    player.vx = 0;
    player.fx = 0;
    player.fy = 0;
}

function ai_person(pixi, player, player_bounds, foreign, foreign_bounds, superspeed) {
    setInterval(() => {
        if(player_bounds.x > foreign_bounds.x) {
            player.fx = (Math.random() < 0.2) ? 6 : -6;
        } else {
            player.fx = (Math.random() < 0.2) ? -6 : 6;
        }

        if(Math.random() < 0.1) {
            player.fy = -25;
        }

        
    }, 200);

    setInterval(() => {
        if(Math.random() < 0.5) {
            if(player.x < foreign.x ^ player.rotation > 0) {
                player.right_arm.rotation = 0;
                player.right_arm.scale.x = 1.5;
            } else {
                player.left_arm.rotation = 0;
                player.left_arm.scale.x = 1.5;
            }
        } else {
            player.right_arm.rotation = Math.PI/4;
            player.left_arm.rotation = -Math.PI/4;
            player.left_arm.scale.x = 1;
            player.right_arm.scale.x = 1;
        }
    }, superspeed ? 50 : 50);
    
}