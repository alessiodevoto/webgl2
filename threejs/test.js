var renderer, scene, camera;
var cameraControls, effectControls;

// mini world shapes and objects
var container_ss, floor_ss;
var inner_hand_s = false;


// inner world shapes and objects
var container_s, floor_s;
var tree_s1, tree_s2, tree_s3, mammoth_s1, mammoth_s2, inner_hand = false;


// outer world shapes and objects
var floor, container, cube, mesh_clock, mesh_back, mesh_clock2, mesh_back2;
var tree1, tree2, tree3, mammoth1, mammoth2, chair, arrow11, arrow12, arrow21, arrow22, hand;

// lights 
//var color_l1, intensity_l1, light_l1;

var sound;

var melting = false;
var animations = [];
var ticks = [0, 0, 0, 0];


init();
setupGUI();
render();


function init()
{	

	/***
	SCENE SETTING
	***/ 

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( new THREE.Color(0xFFFFFF) );
	renderer.shadowMap.enabled = true;
	renderer.state.disable( renderer.context.BLEND );
	renderer.state.setBlending( THREE.NoBlending );
	document.getElementById('container').appendChild( renderer.domElement );

	scene = new THREE.Scene();

	//fog
	const near = 1;
    const far = 1300;
    const color = 'lightblue';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color('lightblue');

	var aspectRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera( 50, aspectRatio , 0.01, 2000 );
	camera.position.set( 1000, 300, 300 );
	cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	//cameraControls.target.set(65, 10, 55);
	cameraControls.target.set(0, 0, 0);


	/***
	SHAPES 
	 ***/

	 //*** INNER INNER SHAPES *** //

	//inner floor
	const floor_gss = new THREE.CircleGeometry( 3, 10);
	var floor_mss = new THREE.MeshPhongMaterial({
          color: 'peru',
          emissive: 'webmaroon',
          shininess: 30,
          opacity:0.3,
          side: THREE.DoubleSide,
          //envMap: that.textureCube,
          refractionRatio: 0.2
          //opacity: 0.5,
          //transparent:true
        });
	floor_ss = new THREE.Mesh( floor_gss, floor_mss );
	floor_ss.rotateX( - Math.PI / 2)
	floor_ss.position.set(0,50,0);
	floor_ss.receiveShadow = true;
	scene.add(floor_ss);

	// inner container
	container_gss = new THREE.SphereGeometry(3, 20, 20); //, 16, 8, 0, 2, 1, 1.6);
   
    const container_mss = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          opacity: 0.5,
          transparent:true
        });
    container_ss = new THREE.Mesh(container_gss,container_mss);//container_m);
    container_ss.position.y = 50;
    container_ss.position.x = 0;
    container_ss.position.x = 0;
    scene.add(container_ss);



	//*** INNER SHAPES *** //

	//inner floor
	const floor_gs = new THREE.CircleGeometry( 10, 20);
	var floor_ms = new THREE.MeshPhongMaterial({
          color: 'peru',
          emissive: 'webmaroon',
          shininess: 30,
          opacity:0.3,
          side: THREE.DoubleSide,
          //envMap: that.textureCube,
          refractionRatio: 0.2
          //opacity: 0.5,
          //transparent:true
        });
	floor_s = new THREE.Mesh( floor_gs, floor_ms );
	floor_s.rotateX( - Math.PI / 2)
	floor_s.position.set(0,45,0);
	floor_s.receiveShadow = true;
	scene.add(floor_s);

	// inner container
	container_gs = new THREE.SphereGeometry(10, 20, 20); //, 16, 8, 0, 2, 1, 1.6);
   
    const container_ms = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          opacity: 0.5,
          transparent:true
        });
    container_s = new THREE.Mesh(container_gs,container_ms);//container_m);
    container_s.position.y = 45;
    container_s.position.x = 0;
    container_s.position.x = 0;
    scene.add(container_s);




	//*** OUTER SHAPES *** //

	//floor
	const floor_g = new THREE.CircleGeometry( 200, 150);
	var floor_m = new THREE.MeshPhongMaterial({
          color: 'peru',
          emissive: 'webmaroon',
          shininess: 30,
          opacity:0.3,
          side: THREE.DoubleSide,
          //envMap: that.textureCube,
          refractionRatio: 0.2
          //opacity: 0.5,
          //transparent:true
        });
	
	floor = new THREE.Mesh( floor_g, floor_m );
	floor.rotateX( - Math.PI / 2)
	floor.position.set(0,-4,0);
	floor.receiveShadow = true;
	scene.add(floor);


	// container
	container_g = new THREE.SphereGeometry(200, 200, 200); //, 16, 8, 0, 2, 1, 1.6);
   
    const container_m = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          opacity: 0.5,
          transparent:true
        });
    container = new THREE.Mesh(container_g,container_m);//container_m);
    container.position.y = 0;
    container.position.x = 0;
    scene.add(container);


	// cube
	const cube_g = new THREE.BoxGeometry(65,40,40); 
	var cube_m = new THREE.MeshPhongMaterial({
          color: 'lightblue',
          emissive: 'saddlebrown',
          shininess: 30,
          opacity:0.3,
          //envMap: that.textureCube,
          refractionRatio: 0.2
          //opacity: 0.5,
          //transparent:true
        });
	var loader_t = new THREE.TextureLoader();
 
					cube_m = new THREE.MeshBasicMaterial({
					  //color: 0xFF8844,
					 map: loader_t.load('models/back_texture.jpg'),
					});
	cube = new THREE.Mesh( cube_g, cube_m );
	cube.position.x = 50;
	cube.position.y = 15;
	cube.position.z = 60;
	cube.rotation.y = -10;
	cube.castShadow = true;
	//cube.receiveShadow = true;
	scene.add( cube );


	//clock 1.1
	const path_clock = new THREE.CatmullRomCurve3(
	[new THREE.Vector3(0,-30,0),
	new THREE.Vector3(-20,-20,0),
	new THREE.Vector3(-30,0,0),
	new THREE.Vector3(-20,20,0),
	new THREE.Vector3(0,30,0),
	new THREE.Vector3(20,20,0),
	new THREE.Vector3(30, 0, 0), 
	new THREE.Vector3(20,-20,0)], true, 'centripetal', 0.5);
	const geometry_clock = new THREE.TubeGeometry( path_clock, 50, 3.5, 50, true );
	var material_clock = new THREE.MeshPhongMaterial({
          color: 'goldenrod',
          emissive: 'goldenrod',
          opacity: 0.5,
        });
	var loader = new THREE.TextureLoader();
 
					material_clock = new THREE.MeshBasicMaterial({
					  //color: 0xFF8844,
					 map: loader.load('models/golden_texture.jpg'),
					});
	mesh_clock = new THREE.Mesh( geometry_clock, material_clock);
	scene.add( mesh_clock);


	//clock_background 1.1
	const geometry_back = new THREE.CircleGeometry( 8.5, 32 );
	//const material_back = new THREE.MeshBasicMaterial( { color: 0xffff00 , side: THREE.DoubleSide} );
	const material_back = new THREE.MeshPhongMaterial({
          color: 'lightblue',
          emissive: 'lightblue',
          shininess: 30,
          opacity:0.3,
          //envMap: that.textureCube,
          refractionRatio: 0.2
        });
	mesh_back = new THREE.Mesh( geometry_back, material_back );
	scene.add( mesh_back );


	//clock 1.2
	const path_clock2 = new THREE.CatmullRomCurve3(
	[new THREE.Vector3(0,-30,0),
	new THREE.Vector3(-20,-20,0),
	new THREE.Vector3(-30,0,0),
	new THREE.Vector3(-20,20,0),
	new THREE.Vector3(0,30,0),
	new THREE.Vector3(20,20,0),
	new THREE.Vector3(30, 0, 0), 
	new THREE.Vector3(20,-20,0)], true, 'centripetal', 0.5);
	const geometry_clock2 = new THREE.TubeGeometry( path_clock, 50, 3.5, 50, true );
	var material_clock2 = new THREE.MeshPhongMaterial({
          color: 'goldenrod',
          emissive: 'goldenrod',
          opacity: 0.5,
        });
	var loader_t = new THREE.TextureLoader();
 
					material_clock2 = new THREE.MeshBasicMaterial({
					  //color: 0xFF8844,
					 map: loader.load('models/golden_texture.jpg'),
					});
	mesh_clock2 = new THREE.Mesh( geometry_clock2, material_clock2);
	scene.add( mesh_clock2);
	var domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
	domEvents.addEventListener(mesh_clock2, 'click', melt2, false);


	//clock_background 1.2
	const geometry_back2 = new THREE.CircleGeometry( 13.5, 32 );
	//const material_back = new THREE.MeshBasicMaterial( { color: 0xffff00 , side: THREE.DoubleSide} );
	var material_back2 = new THREE.MeshPhongMaterial({
          color: 'lightbrown',
          emissive: 'lightbrown',
          shininess: 30,
          opacity:0.3,
          refractionRatio: 0.2,
          side:THREE.DoubleSide
        });
	mesh_back2 = new THREE.Mesh( geometry_back2, material_back2);
	scene.add( mesh_back2 );



	/***
	OUTER OBJECTS
	***/
	
	//tree 1
	var loader = new THREE.ObjectLoader();
	loader.load( 'models/tree2.json', 
		         function (objeto){
		         	console.log(objeto);
                    objeto.scale.set(30,30,30);
                    objeto.position.y = 10;
                    objeto.position.x = 45;
                    objeto.position.z = 52;
		         	scene.add(objeto);
		         	//console.log(objeto);
		         	tree1 = objeto;
		         });


	//tree 2
	loader.load( 'models/tree2.json', 
		         function (objeto){
                    objeto.scale.set(40,40,40);
                    objeto.position.y = 0;
                    objeto.position.x = -80;
                    objeto.position.z = 40;
		         	objeto.rotation.y = Math.PI/3;
		         	tree2 = objeto;
		         	scene.add(objeto);
		         	objeto.traverse ( function (child) {
				    if (child instanceof THREE.Mesh) {
				        child.castShadow = true;
				        child.receiveShadow = true;
					    }
					});
		         });

	//tree 3
	loader.load( 'models/tree2.json', 
		         function (objeto){
                    objeto.scale.set(18,18,18);
                    objeto.position.y = 0;
                    objeto.position.x = 120;
                    objeto.position.z = 120;
		         	objeto.rotation.y = Math.PI/3;
		         	scene.add(objeto);
		         	tree3 = objeto;
		         	objeto.traverse ( function (child) {
				    if (child instanceof THREE.Mesh) {
				        child.castShadow = true;
				        child.receiveShadow = true;
					    }
					});
		         });



	//hands of the clock 1
	loader.load( 'models/arrow.json', 
		         function (objeto){
                    objeto.scale.set(3,3,3);
                    objeto.position.y = 27;
                    objeto.position.x = 83.5;
                    objeto.position.z = 55;
		         	objeto.rotation.y = Math.PI;
		         	objeto.rotation.x = -Math.PI/2;
		         	arrow11 = objeto;
		         	scene.add(objeto);

		         });


	loader.load( 'models/arrow.json', 
		         function (objeto){
                    objeto.scale.set(3,3,3);
                    objeto.position.y = 27;
                    objeto.position.x = 83.5;
                    objeto.position.z = 55;
		         	objeto.rotation.y = Math.PI/3;
		         	objeto.rotation.x = -Math.PI/3.4;
		         	arrow12 = objeto;
		         	scene.add(objeto);
		         });

	//hand of the clock 2
	loader.load( 'models/arrow.json', 
		         function (objeto){
                    objeto.scale.set(5,5,5);
                    objeto.position.y = 36;
                    objeto.position.x = 80;
                    objeto.position.z = -60;
		         	objeto.rotation.y = Math.PI/3;
		         	objeto.rotation.x = -Math.PI/3.4;
		         	arrow21 = objeto;
		         	scene.add(objeto);
		         });


	loader.load( 'models/arrow.json', 
		         function (objeto){
                    objeto.scale.set(5,5,5);
                    objeto.position.y = 36;
                    objeto.position.x = 80;
                    objeto.position.z = -60;
		         	objeto.rotation.y = Math.PI;
		         	objeto.rotation.x = -Math.PI/2;
		         	arrow22 = objeto;
		         	scene.add(objeto);
		         });

	
	// chair
	loader.load( 'models/chair/chair.json', 
		         function (objeto){
		         	//console.log(objeto); 
		         	var mesh = objeto.children[0];
		         	mesh.scale.set(10, 10, 10);
		         	mesh.position.x = 80;
                    mesh.position.z = -78;
		         	mesh.rotation.y = -0.8;
		         	var loader = new THREE.TextureLoader();
		         	var material = new THREE.MeshBasicMaterial({
					map: loader.load('models/dirt_texture.jpg'),
					});
					mesh.material = material;
					chair = mesh;
					scene.add(mesh);	
		         });


	//hand 
	var cl_loader = new THREE.ColladaLoader( );
	cl_loader.load( "models/hand.dae", function ( object ) {

		//console.log(object);

		// mammoth model has loaded
		var model = object.scene.children[0];
		model.scale.set(800, 800, 700);
		model.rotateX(-1.5);
		model.position.set(-280, -60, -60);
		var mesh = model.children[0];
		//mammoth material 
		//var material = mesh.material;
		hand = model;
		scene.add(model);
	});


	// mammoth 1
	var cl_loader = new THREE.ColladaLoader();
	cl_loader.load( "models/mammoth/mammoth.dae", function ( object ) {
		//console.log(object);
		// mammoth model has loaded
		var model = object.scene.children[3];
		model.position.y = 0;
		var mesh = model.children[0];
		mesh.position.set(40,200,-25);
		mesh.rotateX(3.14);
		mesh.rotateZ(-1.7);
		model.scale.set(2, 2, 2);


		//mammoth material 
		var material = mesh.material;
		//material.ambient = new THREE.Color(0x4d2c8a);
		//material.color = new THREE.Color(0x4d2c8a);
		material.shininess = 0;
		material.side = THREE.FrontSide; 

		//bump map texture
		var bumpMap = THREE.ImageUtils.loadTexture( "models/mammoth/claycolor.jpg" );
		bumpMap.anisotropy = 4;
		bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
		bumpMap.format = THREE.RGBFormat;
		material.bumpMap = bumpMap;
		material.bumpScale = .008;
		mesh.scale.set(.015,.015,.015);
		model.rotation.y = Math.PI;
		mammoth1 = model;

		scene.add( model );
		var domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
		domEvents.addEventListener(model, 'click', melt, false);
		
	});



	// mammoth 2
	var cl_loader = new THREE.ColladaLoader( );
	cl_loader.load( "models/mammoth/mammoth.dae", function ( object ) {

		//console.log(object);

		// mammoth model has loaded
		var model = object.scene.children[3];
		model.position.y = 0;
		var mesh = model.children[0];
		mesh.position.set(30,150,-25);
		mesh.rotateX(3.14);
		mesh.rotateZ(-1);
		model.scale.set(1.3, 1.3, 1.3);


		//mammoth material 
		var material = mesh.material;
		//material.ambient = new THREE.Color(0x4d2c8a);
		//material.color = new THREE.Color(0x4d2c8a);
		material.shininess = 0;
		material.side = THREE.FrontSide; 

		//bump map texture
		var bumpMap = THREE.ImageUtils.loadTexture("models/mammoth/claycolor.jpg");
		bumpMap.anisotropy = 4;
		bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
		bumpMap.format = THREE.RGBFormat;
		material.bumpMap = bumpMap;
		material.bumpScale = .008;
		mesh.scale.set(.015,.015,.015);
		model.rotation.y = Math.PI;

		mammoth2 = model;

		scene.add( model );
		var domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
		//var material = mesh.material;
		domEvents.addEventListener(model, 'click', melt, false);

	});



	/*** INNER OBJECTS ***/

	//inner hand 
	var cl_loader = new THREE.ColladaLoader( );
	cl_loader.load( "models/hand.dae", function ( object ) {

		//console.log(object);
		
		var model = object.scene.children[0];
		model.scale.set(40, 40, 40);
		model.rotateX(-1.5);
		model.rotateY(-1.5);
		model.position.set(-6, 35, 5);
		var mesh = model.children[0];
		
		
		var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
		domEvents.addEventListener(model, 'click', callback, false);
		inner_hand = model;
		scene.add(model);
		
	});

	// inner tree 1

	var loader = new THREE.ObjectLoader();
	loader.load( 'models/tree2.json', 
		         function (objeto){
		         	console.log(objeto);
                    objeto.scale.set(1,1,1);
                    objeto.position.y = 45;
                    objeto.position.x = 0;
                    objeto.position.z = 0;
		         	//objeto.rotation.y = Math.PI/3;
		         	scene.add(objeto);
		         	//console.log(objeto);
		         	tree_s1 = objeto;
		     
		         });

	// inner tree 2
	var loader = new THREE.ObjectLoader();
	loader.load( 'models/tree2.json', 
		         function (objeto){
		         	console.log(objeto);
                    objeto.scale.set(1,1,1);
                    objeto.position.y = 45;
                    objeto.position.x = 5;
                    objeto.position.z = 5;
		         	//objeto.rotation.y = Math.PI/3;
		         	scene.add(objeto);
		         	//console.log(objeto);
		         	tree_s2 = objeto;
		         });

	// inner tree 3
	var loader = new THREE.ObjectLoader();
	loader.load( 'models/tree2.json', 
		         function (objeto){
		         	console.log(objeto);
                    objeto.scale.set(1.5,1.5,1.5);
                    objeto.position.y = 45;
                    objeto.position.x = -5;
                    objeto.position.z = 5;
		         	//objeto.rotation.y = Math.PI/3;
		         	tree_s3 = objeto;
		         	scene.add(objeto);

		         	//console.log(objeto);
		         });

	
	// inner mammoth 1
	var cl_loader = new THREE.ColladaLoader( );
	cl_loader.load( "models/mammoth/mammoth.dae", function ( object ) {

		//console.log(object);

		// mammoth model has loaded
		var model = object.scene.children[3];
		model.position.y = 0;
		var mesh = model.children[0];
		mesh.position.set(-1,47.5,-3);
		mesh.rotateX(-1.5);
		mesh.rotateZ(-1.7);
		mesh.scale.set(0.001, 0.001, 0.001);
		//mammoth material 
		var material = mesh.material;
		//material.ambient = new THREE.Color(0x4d2c8a);
		//material.color = new THREE.Color(0x4d2c8a);
		material.shininess = 0;
		material.side = THREE.FrontSide;
		mammoth_s1 = mesh;
		scene.add(mesh);
		});

	// inner mammoth 2
	var cl_loader = new THREE.ColladaLoader( );
	cl_loader.load( "models/mammoth/mammoth.dae", function ( object ) {

		//console.log(object);

		// mammoth model has loaded
		var model = object.scene.children[3];
		model.position.y = 0;
		var mesh = model.children[0];
		mesh.position.set(2,47.5,4);
		mesh.rotateX(-1.5);
		mesh.rotateZ(-1.7);
		mesh.scale.set(0.001, 0.001, 0.001);
		//mammoth material 
		var material = mesh.material;
		//material.ambient = new THREE.Color(0x4d2c8a);
		//material.color = new THREE.Color(0x4d2c8a);
		material.shininess = 0;
		material.side = THREE.FrontSide;
		mammoth_s2 = mesh;
		scene.add(mesh);
		});

		//hand 
	var cl_loader = new THREE.ColladaLoader( );
	cl_loader.load( "models/hand.dae", function ( object ) {

		//console.log(object);

		// mammoth model has loaded
		var model = object.scene.children[0];
		model.scale.set(6, 6, 6);
		model.rotateX(-1.5);
		model.position.set(0, 50, 0);
		var mesh = model.children[0];
		//mammoth material 
		//var material = mesh.material;
		inner_hand_s = model;
		scene.add(model);
	});

	/***
	TEXT
	***/
	// Texto
	var fontLoader = new THREE.FontLoader();
	fontLoader.load( 'fonts/gentilis_bold.typeface.json',
		             function(font){
		             	var geoTexto = new THREE.TextGeometry( 
		             		'12',
		             		{
		             			size: 2,
		             			height: 0.1,
		             			curveSegments: 3,
		             			style: "normal",
		             			font: font,
		             			bevelThickness: 0.05,
		             			bevelSize: 0.04,
		             			bevelEnabled: true
		             		});
		             	var matTexto = new THREE.MeshBasicMaterial({color:'black'});
		             	var texto = new THREE.Mesh( geoTexto, matTexto );
		             	scene.add( texto );
		             	texto.position.set(80,28,58);
		             	texto.rotateX(-2);
		             	texto.rotateZ(-0.3);
		             });



	

	/***
	MODIFIERS
	***/

	// cube modifier 
	const modifier = new ModifierStack(cube);
	const bend = new Bend(1.2, 0.2, 0);
	bend.constraint = ModConstant.RIGHT;
	modifier.addModifier(bend); 
	modifier && modifier.apply();


	//clock modifier
	const modifier_clock = new ModifierStack(mesh_clock);
	const bend_clock = new Bend(1.4, 0.6, 0);
	bend_clock.constraint = ModConstant.RIGHT;
	modifier_clock.addModifier(bend_clock);
	modifier_clock && modifier_clock.apply();	

	mesh_clock.rotateZ(-1.4-1.9);
	mesh_clock.rotateY(3.7);
	mesh_clock.position.set(82.5,27,55);

	mesh_clock.scale.set(0.3, 0.3, 0.3);

	// modifier mesh back 1
	const modifier_back = new ModifierStack(mesh_back);
	const bend_back = new Bend(1.2, 0.6, 0);
	bend_back.constraint = ModConstant.RIGHT;
	modifier_back.addModifier(bend_back);
	modifier_back && modifier_back.apply();	

	mesh_back.rotateZ(-1.7);
	mesh_back.rotateX(3.7);
	mesh_back.position.set(82.5,27,55);


	//clock modifier 2
	const modifier_clock2 = new ModifierStack(mesh_clock2);
	const bend_clock2 = new Bend(1.4, 0.6, 0);
	bend_clock2.constraint = ModConstant.RIGHT;
	modifier_clock2.addModifier(bend_clock2);
	modifier_clock2 && modifier_clock2.apply();	

	mesh_clock2.rotateZ(-1.4-1.9);
	mesh_clock2.position.set(80,36,-60);
	mesh_clock2.scale.set(0.5, 0.5, 0.5);


	// modifier mesh back 2
	const modifier_back2 = new ModifierStack(mesh_back2);
	const bend_back2 = new Bend(1.2, 0.6, 0);
	bend_back2.constraint = ModConstant.RIGHT;
	modifier_back2.addModifier(bend_back2);
	modifier_back2 && modifier_back2.apply();	

	mesh_back2.rotateZ(-1.7);
	mesh_back2.position.set(80,36,-60);


	/*** 
	LIGHTS 
	***/

	
	color_l1 = 0x2b7838;
	intensity_l1 = 0.5;
	light_l1 = new THREE.AmbientLight(color_l1, intensity_l1);
	//light_l1.castShadow = true;
	scene.add(light_l1);


    color_l3 = 0xFFFFFF;
    intensity_l3 = 1;
    light_l3 = new THREE.SpotLight(color_l3, intensity_l3);
    light_l3.position.set(0, 45, 0);
    light_l3.target.position.set(80, 0, -78);
    light_l3.castShadow = true;
    scene.add(light_l3);
    scene.add(light_l3.target);
    const helper_l3 = new THREE.SpotLightHelper(light_l3);
    //scene.add(helper_l3);

    color_l2 = 0xFFFFFF;
    intensity_l2 = 1;
    light_l2 = new THREE.SpotLight(color_l3, intensity_l3);
    light_l2.position.set(0, 45, 0);
    light_l2.target.position.set(50, 0, 60);
    light_l2.castShadow = true;
    scene.add(light_l2);
    scene.add(light_l2.target);
    const helper_l2 = new THREE.SpotLightHelper(light_l2);
    //scene.add(helper_l3);

  

	// directional light
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );	
	//directionalLight.intensity = 0.7;
 	//directionalLight.target = object;
	scene.add( directionalLight );



	// create an AudioListener and add it to the camera
	const listener = new THREE.AudioListener();
	camera.add( listener );

	// create a global audio source
	sound = new THREE.Audio( listener );

	// load a sound and set it as the Audio object's buffer
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load( 'sounds/test.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		sound.setVolume( 0.5 );
		//sound.play();
	});

	

	
	window.addEventListener('resize', updateAspectRatio );

}


	/***
	GUI 
	 ***/
function setupGUI()
	{
		class ColorGUIHelper {
		  constructor(object, prop) {
		    this.object = object;
		    this.prop = prop;
		  }
		  get value() {
		    return `#${this.object[this.prop].getHexString()}`;
		  }
		  set value(hexString) {
		    this.object[this.prop].set(hexString);
		  }
		}

		// Controles
		effectControls = {
			mensaje: "Persistencia Memoria",
			hand_speed: 0.5,
			separacion: [],
			caja: true,
			melting_m1 : melt_mammoth1,
			melting_m2 : melt_mammoth2,
			play: play_song,
			pause: pause_song
		};

	
	

		// Interfaz
		var gui = new dat.GUI();

		var folder_light1 = gui.addFolder("light 1");
		folder_light1.addColor(new ColorGUIHelper(light_l1, 'color'), 'value').name('color');
		folder_light1.add(light_l1, 'intensity', 0, 1, 0.01);

		var folder_light2 =  gui.addFolder("light 2");
		folder_light2.addColor(new ColorGUIHelper(light_l2, 'color'), 'value').name('color');
	    folder_light2.add(light_l2, 'intensity', 0, 2, 0.01);
	    folder_light2.add(light_l2.target.position, 'x', -30, 30, .01);
	    folder_light2.add(light_l2.target.position, 'z', -30, 30, .01);
	    folder_light2.add(light_l2.target.position, 'y', 0, 10, .01);

	    var folder_light3 =  gui.addFolder("light 3");
		folder_light3.addColor(new ColorGUIHelper(light_l3, 'color'), 'value').name('color');
	    folder_light3.add(light_l3, 'intensity', 0, 2, 0.01);
	    folder_light3.add(light_l3.target.position, 'x', -30, 30, .01);
	    folder_light3.add(light_l3.target.position, 'z', -30, 30, .01);
	    folder_light3.add(light_l3.target.position, 'y', 0, 10, .01);
		
		// folder.add( effectControls, "mensaje" ).name("App");
		gui.add( effectControls, "hand_speed", 0, 1, 0.01 ).name("Hand rotation");
		//var obj = { add: melt3() };

		gui.add(effectControls,'melting_m1').name('Melt mammoth 1 :)');
		gui.add(effectControls,'melting_m2').name('Melt mammoth 2 :)');
		gui.add(effectControls, 'play').name('Play');
		gui.add(effectControls, 'pause').name('Pause');


		// folder.add( effectControls, "separacion", {Ninguna:0, Media:1, Maxima:2} ).name("Separacion");
		// folder.add( effectControls, "caja" ).name("Ver al soldado");
		
	 }


function updateAspectRatio()
{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function update()
{
  cameraControls.update();
  if(inner_hand != false) inner_hand.rotation.y += effectControls.hand_speed / 10;
  if(inner_hand_s != false) inner_hand_s.rotation.y += 0.01;
  TWEEN.update();

}

function render()
{	
	if (melting) {
		for(i=0; i<animations.length; i++){
			if(ticks[i] < 10) animations[i].update(0, ticks[i]);
			ticks[i]+=.1;
			//console.log(ticks[i]);
		}
	}
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}

function callback(event){
	console.log("CLICK");
	console.log(event);
	var end = event.target.rotation.y;
	var tweenA = new TWEEN.Tween(inner_hand.position).to({y:140}, 1500).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenB = new TWEEN.Tween(floor_s.position).to({y:150}, 1500).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenC = new TWEEN.Tween(tree_s1.position).to({y:150}, 1500).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenD = new TWEEN.Tween(tree_s2.position).to({y:150}, 1500).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenE = new TWEEN.Tween(tree_s3.position).to({y:150}, 1500).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenF = new TWEEN.Tween(mammoth_s1.position).to({y:152.5}, 1500).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenG = new TWEEN.Tween(mammoth_s2.position).to({y:152.5}, 1500).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenH = new TWEEN.Tween(container_s.position).to({y:152.5}, 1500).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenI = new TWEEN.Tween(floor_ss.position).to({y:180.5}, 1700).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenL = new TWEEN.Tween(container_ss.position).to({y:180.5}, 1700).easing(TWEEN.Easing.Bounce.EaseIn);
	var tweenJ = new TWEEN.Tween(inner_hand_s.position).to({y:175.5}, 1700).easing(TWEEN.Easing.Bounce.EaseIn);

	


    tweenA.start();
    tweenB.start();
    tweenC.start();
    tweenD.start();
    tweenE.start();
    tweenF.start();
    tweenG.start();
    tweenH.start(); 
    tweenI.start();
    tweenL.start(); 
    tweenJ.start();


}

function play_song(){
	sound.play();
}

function pause_song(){
	sound.pause();
}

function melt(event){

	console.log("CLICK");
	console.log(event);
	melting = true;

	var waveform = { amplitude:0.9, speed:0.15, wavelength:0.5, timeOffset:0 };
	var meltAmount = 0.8;//var meltAmount = 0.08;
	var modelHeight = 30;
	var spreadAmount = 0.003; //	var spreadAmount = 1;
	var poolThickness = 0.6;
	var outwardSpeed = .6;
	var pushType = "Normals";
	var noiseAmplitude = .1;
	var noiseFrequency = .1;
	var noiseOffset = 1;
	//var bbox = new THREE.Box3(new THREE.Vector3( 80, 80, 80 ), new THREE.Vector3( -20, -20, -20));
	var bbox = new THREE.Box3(new THREE.Vector3( 0, 20, 0 ), new THREE.Vector3( 0, -1.8, 0));


	var vertDist = bbox.max.y - bbox.min.y;
	var generator = new Simple1DNoise();

	
	//setup vertex animation to manipulate model vertices
		vertexAnimation = new THREEx.VertexAnimation(event.target.children[0].geometry, function(origin, position, delta, now){

			position.z += meltAmount * vertDist;
			
			//handle the points that are below the bbox min
			if (position.z < bbox.min.y)
			{
				var fractionBelowBboxMin = (bbox.min.y-position.z)/(bbox.max.y-bbox.min.y);

				//generate a push vectorbased on the push type
				var pushVector = 0;
				var centroid = bbox.max.clone().add(bbox.min.clone()).divideScalar(2.0);
				pushVector = position.clone().sub(centroid);
				pushVector.z = 0;

				//push the points outwards, with some noise
				var n = noiseAmplitude * generator.getVal( (position.x) * noiseFrequency + noiseOffset);
				var outV = pushVector.multiplyScalar( ((meltAmount * spreadAmount) + n) * outwardSpeed ); //* fractionBelowBboxMin
				position.add(outV);
				waveform.speed; 

				position.z += meltAmount * poolThickness;
			}
	    });
		animations.push(vertexAnimation);
		
}

function melt_mammoth1(){

	console.log("CLICK");
	console.log(event);
	melting = true;

	var waveform = { amplitude:0.9, speed:0.15, wavelength:0.5, timeOffset:0 };
	var meltAmount = 0.08;
	var modelHeight = 10;
	var spreadAmount = 1;
	var poolThickness = 0.6;
	var outwardSpeed = .06;
	var pushType = "Normals";
	var noiseAmplitude = .1;
	var noiseFrequency = .1;
	var noiseOffset = 1;
	var bbox = new THREE.Box3(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 5, 5, 5));

	

	var vertDist = bbox.max.y - bbox.min.y;
	var generator = new Simple1DNoise();

	
	//setup vertex animation to manipulate model vertices
		vertexAnimation = new THREEx.VertexAnimation(mammoth1.children[0].geometry, function(origin, position, delta, now){

			position.z += meltAmount * vertDist;
			
			//handle the points that are below the bbox min
			if (position.z < bbox.min.y)
			{
				var fractionBelowBboxMin = (bbox.min.y-position.y)/(bbox.max.y-bbox.min.y);

				//generate a push vectorbased on the push type
				var pushVector = 0;
				var centroid = bbox.max.clone().add(bbox.min.clone()).divideScalar(2.0);
				pushVector = position.clone().sub(centroid);
				pushVector.z = 0;

				//push the points outwards, with some noise
				var n = noiseAmplitude * generator.getVal( (position.x) * noiseFrequency + noiseOffset);
				var outV = pushVector.multiplyScalar( ((meltAmount * spreadAmount) + n) * outwardSpeed ); //* fractionBelowBboxMin
				position.add(outV);
				waveform.speed; 

				position.z += meltAmount * poolThickness;
			}
	    });
		animations.push(vertexAnimation);
		
}

function melt_mammoth2(){

	console.log("CLICK");
	console.log(event);
	melting = true;

	var waveform = { amplitude:0.9, speed:0.15, wavelength:0.5, timeOffset:0 };
	var meltAmount = 0.08;
	var modelHeight = 10;
	var spreadAmount = 1;
	var poolThickness = 0.6;
	var outwardSpeed = .06;
	var pushType = "Normals";
	var noiseAmplitude = .1;
	var noiseFrequency = .1;
	var noiseOffset = 1;
	var bbox = new THREE.Box3(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 5, 5, 5));
	

	var vertDist = bbox.max.y - bbox.min.y;
	var generator = new Simple1DNoise();

	
	//setup vertex animation to manipulate model vertices
		vertexAnimation = new THREEx.VertexAnimation(mammoth2.children[0].geometry, function(origin, position, delta, now){

			position.z += meltAmount * vertDist;
			
			//handle the points that are below the bbox min
			if (position.z < bbox.min.y)
			{
				var fractionBelowBboxMin = (bbox.min.y-position.y)/(bbox.max.y-bbox.min.y);

				//generate a push vectorbased on the push type
				var pushVector = 0;
				var centroid = bbox.max.clone().add(bbox.min.clone()).divideScalar(2.0);
				pushVector = position.clone().sub(centroid);
				pushVector.z = 0;

				//push the points outwards, with some noise
				var n = noiseAmplitude * generator.getVal( (position.x) * noiseFrequency + noiseOffset);
				var outV = pushVector.multiplyScalar( ((meltAmount * spreadAmount) + n) * outwardSpeed ); //* fractionBelowBboxMin
				position.add(outV);
				waveform.speed; 

				position.z += meltAmount * poolThickness;
			}
	    });
		animations.push(vertexAnimation);
		
}

function melt2(event){

	console.log("CLICK");
	console.log(event);
	melting = true;

	var waveform = { amplitude:0.9, speed:0.15, wavelength:0.5, timeOffset:0 };
	var meltAmount = 0.08;
	var modelHeight = 10;
	var spreadAmount = 1;
	var poolThickness = 0.6;
	var outwardSpeed = .06;
	var pushType = "Normals";
	var noiseAmplitude = .1;
	var noiseFrequency = .1;
	var noiseOffset = 1;
	var bbox = new THREE.Box3(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 5, 5, 5));
	var vertDist = bbox.max.y - bbox.min.y;
	var generator = new Simple1DNoise();

	
	//setup vertex animation to manipulate model vertices
		vertexAnimation = new THREEx.VertexAnimation(event.target.geometry, function(origin, position, delta, now){

			position.y += meltAmount * vertDist;
			
			//handle the points that are below the bbox min
			if (position.y > bbox.min.y)
			{
				var fractionBelowBboxMin = (bbox.min.y-position.y)/(bbox.max.y-bbox.min.y);

				//generate a push vectorbased on the push type
				var pushVector = 0;
				var centroid = bbox.max.clone().add(bbox.min.clone()).divideScalar(2.0);
				pushVector = position.clone().sub(centroid);
				pushVector.y = 0;

				//push the points outwards, with some noise
				var n = noiseAmplitude * generator.getVal( (position.x) * noiseFrequency + noiseOffset);
				var outV = pushVector.multiplyScalar( ((meltAmount * spreadAmount) + n) * outwardSpeed ); //* fractionBelowBboxMin
				position.add(outV);
				waveform.speed; 

				position.y += meltAmount * poolThickness;
			}
	    });
	    animations.push(vertexAnimation);

	    vertexAnimation = new THREEx.VertexAnimation(mesh_back2.geometry, function(origin, position, delta, now){

			position.x += meltAmount * vertDist;
			
			//handle the points that are below the bbox min
			if (position.x > bbox.min.y)
			{
				var fractionBelowBboxMin = (bbox.min.y-position.y)/(bbox.max.y-bbox.min.y);

				//generate a push vectorbased on the push type
				var pushVector = 0;
				var centroid = bbox.max.clone().add(bbox.min.clone()).divideScalar(2.0);
				pushVector = position.clone().sub(centroid);
				pushVector.x = 0;

				//push the points outwards, with some noise
				var n = noiseAmplitude * generator.getVal( (position.x) * noiseFrequency + noiseOffset);
				var outV = pushVector.multiplyScalar( ((meltAmount * spreadAmount) + n) * outwardSpeed ); //* fractionBelowBboxMin
				position.add(outV);
				waveform.speed; 

				position.x += meltAmount * poolThickness;
			}
	    });
	    animations.push(vertexAnimation);
		
}

function Simple1DNoise() {
	var MAX_VERTICES = 256;
	var MAX_VERTICES_MASK = MAX_VERTICES -1;
	var amplitude = 1;
	var scale = 1;

	var r = [];

	for ( var i = 0; i < MAX_VERTICES; ++i ) {
		r.push(Math.random());
	}

	var getVal = function( x ){
		var scaledX = x * scale;
		var xFloor = Math.floor(scaledX);
		var t = scaledX - xFloor;
		var tRemapSmoothstep = t * t * ( 3 - 2 * t );

		/// Modulo using &
		var xMin = xFloor & MAX_VERTICES_MASK;
		var xMax = ( xMin + 1 ) & MAX_VERTICES_MASK;

		var y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

		return y * amplitude;
	};

	/**
	* Linear interpolation function.
	* @param a The lower integer value
	* @param b The upper integer value
	* @param t The value between the two
	* @returns {number}
	*/
	var lerp = function(a, b, t ) {
		return a * ( 1 - t ) + b * t;
	};

	// return the API
	return {
		getVal: getVal,
		setAmplitude: function(newAmplitude) {
			amplitude = newAmplitude;
		},
		setScale: function(newScale) {
			scale = newScale;
		}
	};
};

