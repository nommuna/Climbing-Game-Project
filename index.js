
//Create the renderer
var renderer = PIXI.autoDetectRenderer(257, 257);
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//loading the sprites
var texture = PIXI.Texture.fromImage('pic1.png');

for (var i = 0; i < 10; i++)
{
    createCircles(100,100);
}

function createCircles(x,y){
    var sprite = new PIXI.Sprite(texture);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.anchor.set(0.5);
    sprite
        // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
    sprite.position.x = x;
    sprite.position.y = y;
    stage.addChild(sprite);
}

var timer = new PIXI.Text('Timer: 0:0', {
    font:'32px sans-serif', fill: 'white'
});
timer.position.x = 750;
timer.position.y = 20;
stage.addChild(timer);

var count = 0;
//var countM = 0;

requestAnimationFrame(animate);

function animate() {
    renderer.render(stage);
    count += 0.05;
    //countM += 0.05;
    timer.text = 'Timer: '+ Math.floor(count);

    // render the stage
    requestAnimationFrame(animate);

}

function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}
