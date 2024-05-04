var inc = 0.01;
var scl = 20;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;
var colorsImage = [];
var colorIndex;

function preload() {
    img = loadImage('asset/test_01.jpg');
  }

function setup() {
    createCanvas(400, 400);
    cols = floor(width / scl);
    rows = floor(height / scl);
    fr = createP('');

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 1000; i++) {
        particles[i] = new Particle();
    }

    image(img, 0, 0);
    let c = get(0,0);
    for(let i = 0 ; i <img.width ; i++){
        for (let j = 0 ; j < img.height; j++){
            colorsImage.push(get(i,j));
        }
    }
    // background(255);
}

function draw() {

    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 50);
        }
        yoff += inc;

        zoff += 0.00003;
    }
    colorIndex = floor(random(colorsImage.length));
    // console.log(colorIndex);
    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show(colorIndex, colorsImage);
    }

    // fr.html(floor(frameRate()));
}
