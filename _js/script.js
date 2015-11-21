'use strict';

let scene, camera, renderer;
let amountSpheres, amountCubes;
let spheres = [];
let cubes = [];
let player;
let radiusSphereCollection, radiusCubeCollection;

let parametersSpheres, parametersCubes;
let analyser, frequencyData, ctx, audio;

let OrbitControls = require('three-orbit-controls')(THREE);

import {sliderParameters, settings, sets} from './data/';
import {Player, BufferLoader} from './modules/sound/';
import {MathUtil, SoundUtil} from './modules/util/';
import {Circle, Cube} from './modules/svg/';
//import {$} from './helpers/util';
//import helloworldTpl from '../_hbs/helloworld';

const randomBetween = (min, max, round=true, signed=false) => {
  let rand = min + Math.random() * (max-min);
  if(rand) rand = Math.round(rand);
  if(signed && randomBool()){
    return rand - (rand*2);
  }
  return rand;
};

const randomBool = () => {
  return Boolean(Math.round(Math.random()));
};

const loadSetting = setting => {

  if(setting.type === 'samples'){

    let loader = new BufferLoader(ctx);
    loader.load(sets[setting.set])
      .then(data => slidersSETUP(setting, data));

  }else{
      slidersSETUP(setting);
  }
};

const init = () => {

	radiusCubeCollection = 50;
	radiusSphereCollection = 50;
	amountSpheres = 10;
	amountCubes = 10;

	ctx = new AudioContext();
  player = new Player(ctx);

	window.AudioContext =
    window.AudioContext ||
    window.webkitAudioContext;

  let setting = settings[2];
  loadSetting(setting);

	parametersSETUP();
	// analyseAudio();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight,
    1, 1000
  );

  renderer = new THREE.WebGLRenderer();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  new OrbitControls(camera);
  document.querySelector('.view').appendChild(renderer.domElement);

  createSpheres(setting);
  createCubes();
  render();
};

const removeEntity = (object) => {
	var selectedObject = scene.getObjectByName(object.shape.name);
	scene.remove( selectedObject );

};

const slidersSETUP = (setting) => {

	$('#val_amount_spheres').html(amountSpheres);

  $('#amount_spheres').slider({
      min: 0,
      max: 50,
      step: 2,
      value: 10,

			slide: function(event, ui) {

				$('#val_amount_spheres').html(ui.value);

				for (let i =0; i<spheres.length; i++){
					removeEntity(spheres[i]);
					}

				for (let i =0; i<cubes.length; i++){
					removeEntity(cubes[i]);
					}
					spheres = [];
					cubes = [];
					amountSpheres = ui.value;
					amountCubes = ui.value;
					createSpheres(setting);
					createCubes();
				}
	});

	$('#radiusCollection_spheres').slider({

      min: 30,
      max: 200,
      step: 10,
      value: 50,

      slide: function(event, ui) {


        //$('#val_amount_spheres').html(ui.value);

        for (let i =0; i<spheres.length; i++){
          removeEntity(spheres[i]);
          }
          radiusSphereCollection = ui.value;

        for (let i =0; i<cubes.length; i++){
          removeEntity(cubes[i]);
          }
        //  spheres = [];
        //  cubes = [];
        //  amountSpheres = ui.value;
        //  amountCubes = ui.value;
          createSpheres(setting);
          createCubes();
        }
  });


      for(let i =0; i<$('.param').length; i++){
        $('#name_' . i).html(sliderParameters[i].name);
        $('#val_' . i).html(sliderParameters[i].value);
        $('#param_' . i).slider({

          min: sliderParameters[i].min,
          max: sliderParameters[i].max,
          step: sliderParameters[i].step,
          value: sliderParameters[i].value,

      slide: function(event, ui) {
        $('#val_' . i).html(ui.value);
        scene = new THREE.Scene();

        for (let j =0; j<spheres.length; j++){
          //removeEntity(spheres[j]);
          //removeEntity(cubes[j]);

          switch (i){
            case 0:
            parametersSpheres.radius = ui.value;
            spheres[j].setRadius(ui.value);
            break;

            case 1:
            parametersSpheres.widthSegments = ui.value;
            spheres[j].setWidthSegments(ui.value);
            break;

            case 2:
            parametersSpheres.heightSegments = ui.value;
            spheres[j].setHeightSegments(ui.value);
            break;

          }
          scene.add(spheres[j].render());

          }

          for(let k =0; k <cubes.length; k++){
            scene.add(cubes[k].render());
          }
        }
        });
      }
};


const parametersSETUP = () => {

  parametersSpheres = {
    radius: 15,
    widthSegments: 8,
    heightSegments: 8,
    phiStart: 0,
    phiLength: 6,
    thetaStart: 1,
    thetaLength: 4.2
  };

  parametersCubes = {
   width: 15,
   height: 15,
   widthSegments: 8,
   heightSegments: 8,
   depth: 15,
   depthSegments: 6
  };
};

const createSpheres = (setting) => {
  let angle = 0;
  let step = (2*Math.PI) / amountSpheres;

   let {type, from, to, amount} = setting;
   amount = amount;

  for(let i = 0; i< amountSpheres; i++ ){

    let cosRange = Math.round(radiusSphereCollection * Math.cos(angle) - parametersSpheres.radius/2);
    let sinRange = Math.round(radiusSphereCollection * Math.sin(angle) - parametersSpheres.radius/2);

   let xPos = randomBetween(0, cosRange, true, true);
     let yPos = randomBetween(0, sinRange, true, true);
     let zPos = randomBetween(10, 60, true, true);

   let circle = new Circle({
    x: xPos,
    y: yPos,
    z: zPos},
    parametersSpheres
   );
   angle += step;


   circle.type = type;
   if(type === 'osc'){

      from = parseInt(from);
      to = parseInt(to);

      circle.frequency = from + ((to / amount) * i);

    }

   scene.add(circle.render());
   let {x, y, z} = circle.position;
   spheres.push(circle);

   console.log(x, y, z);

 }
 //console.log(amountSpheres, spheres.length);

  camera.position.z = 150;
 //  camera.position.x = 50;
  // scene.remove(circle.render());
};

const createCubes = () => {
  let angle = 0;
  let step = (2*Math.PI) / amountCubes;

  for(let i = 0; i< amountCubes; i++ ){

    let cosRange = Math.round(50 * Math.cos(angle) - parametersCubes.width/2);
    let sinRange = Math.round(50 * Math.sin(angle) - parametersCubes.width/2);

    let xPos = randomBetween(0, cosRange, true, true);
    let yPos = randomBetween(0, sinRange, true, true);
    let zPos = randomBetween(10, 60, true, true);


   let cube = new Cube({
    x: xPos,
    y: yPos,
    z: zPos},

    parametersCubes
   );

   angle += step;

   scene.add(cube.render());
   let {x, y, z} = cube.position;
   cubes.push(cube);
 }

  camera.position.z = 150;
  //camera.position.x = 50;
  //scene.remove(circle.render());

};

const render = () => {
  renderer.render(scene, camera);
  //analyser.getByteFrequencyData(frequencyData);
  requestAnimationFrame(() => render());
};

const analyseAudio = () => {

  audio = document.getElementById('myAudio');
  let audioSrc = ctx.createMediaElementSource(audio);
  analyser = ctx.createAnalyser();

  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);
  analyser.fftSize = 256;
  frequencyData = new Uint8Array(analyser.frequencyBinCount);

  audio.play();

};

init();
