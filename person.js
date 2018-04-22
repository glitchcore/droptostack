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