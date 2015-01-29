// Jacinda Ballantyne, 1/30/15
var gl;
var points;
var i=0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	
	// Square
	var sq_vertices = [
		vec2(-1,1),
		vec2(1,1),
		vec2(1,-1),
		vec2(-1,-1)
	];
	
	// Triangle
	var t_vertices = [
		vec2(0,1),
		vec2(1,-1),
		vec2(-1,-1)
	];
	
	// Rhombus
	var r_vertices = [
		vec2(-1, 0),
		vec2(0, 0.5),
		vec2(1, 0),
		vec2(0, -0.5)
	];
	
    // Load the data into the GPU
	var sq_bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sq_bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(sq_vertices), gl.STATIC_DRAW);

	// Associate our shader variables with our data buffer
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
		
   	render(4);
	
	
	canvas.onclick = function(){
		if(i==0){
			var sq_bufferId = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, sq_bufferId);
			gl.bufferData(gl.ARRAY_BUFFER, flatten(sq_vertices), gl.STATIC_DRAW);
			
			points=4;
		}
		else if (i==1){
			var t_bufferId = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, t_bufferId);
			gl.bufferData(gl.ARRAY_BUFFER, flatten(t_vertices), gl.STATIC_DRAW);
		
			points=3;
		}
		else if (i==2){
			var r_bufferId = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, r_bufferId);
			gl.bufferData(gl.ARRAY_BUFFER, flatten(r_vertices), gl.STATIC_DRAW);
			
			points=4;
		}
				
		// Associate our shader variables with our data buffer
		var vPosition = gl.getAttribLocation(program, "vPosition");
		gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vPosition);
		
		if(i==0){render(4);i=1;}
		else if(i==1){render(3); i=2;}
		else if(i==2){render(4); i=0;}
	};

    
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays(gl.TRIANGLE_FAN, 0, points); 
	
}
