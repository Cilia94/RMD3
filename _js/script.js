'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills

let scene, camera, renderer;
let amountSpheres;
let spheres = [];
//let circle;
let parameters;


let OrbitControls = require('three-orbit-controls')(THREE);

import {sliderParameters} from './data/';
import {MathUtil} from './modules/util/';

import Circle from './modules/svg/Circle';

//import {$} from './helpers/util';
//import helloworldTpl from '../_hbs/helloworld';

const init = () => {
	amountSpheres = 10;

	parameters = {
	radius: 15,
	widthSegments: 8,
	heightSegments: 8,
	phiStart: 0,
	phiLength: 6,
	thetaStart: 1,
	thetaLength: 4.2
	}

	$('#val_amount_spheres').html(amountSpheres); 
	$('#amount_spheres').slider({

			min: 0,
			max: 50,
			step: 2,
			value: 10,

			slide: function(event, ui) { 
				amountSpheres = ui.value;
				$('#val_amount_spheres').html(ui.value); 

				for (let i =0; i<spheres.length; i++){
					removeEntity(spheres[i]);
					}
					spheres = [];
					createCircle();
				} 
	})


	  	for(let i =0; i<$('.param').length; i++){
	  		$('#name_' + i).html(sliderParameters[i].name);
	  		$('#val_' + i).html(sliderParameters[i].value); 
	  		$('#param_' + i).slider({

		  	min: sliderParameters[i].min,
			max: sliderParameters[i].max,
			step: sliderParameters[i].step,
			value: sliderParameters[i].value,

			slide: function(event, ui) { 
				$('#val_' + i).html(ui.value); 

				for (let j =0; j<spheres.length; j++){
					removeEntity(spheres[j]);
					switch (i){
						case 0:
						parameters.radius = ui.value;
						spheres[j].setRadius(ui.value);
						break;

						case 1: 
						parameters.widthSegments = ui.value;
						spheres[j].setWidthSegments(ui.value);
						break;

						case 2:
						parameters.heightSegments = ui.value;
						spheres[j].setHeightSegments(ui.value);
						break;

					}
					scene.add(spheres[j].render());
					}
				} 
	  		})
	  	};

	scene = new THREE.Scene();
  	camera = new THREE.PerspectiveCamera(
	75, window.innerWidth/window.innerHeight, 0.1, 1000
  );

  renderer = new THREE.WebGLRenderer();

  renderer.setSize(
   window.innerWidth,
	window.innerHeight
  );

  //new OrbitControls(camera);
  document.querySelector('main').appendChild(renderer.domElement);

  createCircle();
  render();

};

function removeEntity(object) {
	var selectedObject = scene.getObjectByName(object.shape.name);
	scene.remove( selectedObject );

}

const createCircle = () => {

// this.parameters = {
 //    radius: radius,
 //    widthSegments: widthSegments,
 //    heightSegments: heightSegments,
 //    phiStart: phiStart,
 //    phiLength: phiLength,
 //    thetaStart: thetaStart,
 //    thetaLength: thetaLength
 //  };

	let angle = 0;
	let step = (2*Math.PI) / amountSpheres;

 	for(let i = 0; i< amountSpheres; i++ ){

 	 var xPos = Math.round(50 * Math.cos(angle) - parameters.radius/2);
     var yPos = Math.round(50 * Math.sin(angle) - parameters.radius/2);

	 let circle = new Circle(
	   {x: xPos,
		y: yPos,
		z: 10},
		parameters
	 );
	 angle += step;

	 scene.add(circle.render());
	 let {x, y, z} = circle.position;
	 spheres.push(circle);
 }

  camera.position.z = 150;
  //camera.position.x = 50;
	//scene.remove(circle.render());

};

const render = () => {

  renderer.render(scene, camera);
//console.log('render');
  
  requestAnimationFrame(() => render());

};

init();
