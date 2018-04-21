const Graphics = PIXI.Graphics;
const Text = PIXI.Text;
const Container = PIXI.Container;

let DARK_STYLE_H1 = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 56,
  fill: "white",
  stroke: '#aaaaaa',
  strokeThickness: 1,
  dropShadow: true,
  dropShadowColor: "#cccccc",
  dropShadowBlur: 15,
  dropShadowAngle: Math.PI / 7,
  dropShadowDistance: 3,
});

let DARK_STYLE_H2 = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
  stroke: '#aaaaaa',
  strokeThickness: 2,
  dropShadow: true,
  dropShadowColor: "#cccccc",
  dropShadowBlur: 10,
  dropShadowAngle: Math.PI / 7,
  dropShadowDistance: 3,
});