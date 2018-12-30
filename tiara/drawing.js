// Make an instance of two and place it on the page.
let elem = document.getElementById('draw-shapes');
let params = { fullscreen: true };
let two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

let cakeBase = two.makeRoundedRectangle(0, 0, 80, 40, 2);
let cakeBaseA = two.makeRectangle(0, 0, 80, 20);

let makeSprinkles = function(n) {
    let sprinkles = [];
    for (let i=0; i<n; i++) {
        let sprinkle = two.makeRoundedRectangle(Math.random() * (cakeBaseA.width)/n + (cakeBaseA.width-10)/2 - (i*(cakeBaseA.width-5)/n), Math.random()*cakeBaseA.height/3, 1, 3, 0.5);
        sprinkle.rotation = Math.random() * Math.PI;
        sprinkle.fill = rainbow(n, 2*i);
        sprinkle.noStroke();
        sprinkles.push(sprinkle);
    }
    return two.makeGroup(sprinkles);
};

let candlesArr = [];
var gradRad = two.makeRadialGradient(
    0,
    1.5,
    2,
    new Two.Stop(0, "orange", 1),
    new Two.Stop(1, "red", 1),
);
for (let i=0; i<5; i++) {
    const cw = 3,
        ch = 20,
        cx = (cw+5)*(i-2),
        cy = -(cakeBase.height+ch)/2;

    let candle = two.makeRectangle(cx, cy, cw, ch);
    candle.fill = 'orange';

    const fw = 1.5,
        fh = 3,
        fx = cx,
        fy = cy-ch/2-fh/2-1;
    
    let fire = two.makeEllipse(fx, fy, fw, fh);
    fire.fill = gradRad;

    let burningCandle = two.makeGroup(candle, fire);
    burningCandle.linewidth = 0.5;
    candlesArr.push(burningCandle);
}

let styles = {
    family: 'proxima-nova, sans-serif',
    size: 20,
    leading: 50,
    weight: 100
};
let msg = two.makeText("happy birthday tiara!", 0, cakeBase.height, styles);

cakeBase.fill = 'rgb(0, 200, 255)';
cakeBase.opacity = 0.75;

let candles = two.makeGroup(candlesArr);


let group = two.makeGroup(cakeBase, cakeBaseA, makeSprinkles(40), candles, msg);
group.translation.set(two.width / 2, two.height / 2 + 50);
group.scale = 4;


// Don't forget to tell two to render everything
// to the screen
let dir = 1;
two.bind('update', function(frameCount) {
  // This code is called everytime two.update() is called.
  // Effectively 60 times per second.
  gradRad.radius += dir*0.1;
  if (gradRad.radius > 3 || gradRad.radius < 1) {
      dir = -dir;
  }
  candles.height

}).play();