'use strict';


import {SoundUtil} from '../util/';

import EventEmitter from 'eventemitter2';

export default class Circle extends EventEmitter {

	constructor(position, parameters){

		super();

		this.position = position;
		//this.name = "testn";
		this.fill = '#90FFFF';
    //this.fill = this.effect.color;
    this._onFrame();

		this.parameters = parameters;

    console.log(this);

	}

	_onFrame(){

	requestAnimationFrame(() => this._onFrame());

	}

	setParameters(parameters){

		this.parameters = parameters;

	}

	setRadius(parameter){

		this.parameters.radius = parameter;
		this.render();

	}

	setPhiLength(parameter){

		this.parameters.phiLength = parameter;
		this.render();

	}

	setWidthSegments(parameter){

		this.parameters.widthSegments = parameter;
		this.render();

	}

	setHeightSegments(parameter){

		this.parameters.heightSegments = parameter;
		this.render();

	}

	render(){

		let {x, y, z} = this.position;

		let {radius, fill} = this;

    console.log(x, y, z, fill, radius);

		let geometry = new THREE.SphereGeometry(this.parameters.radius, this.parameters.widthSegments, this.parameters.heightSegments);

		let material = new THREE.MeshBasicMaterial({
			color: this.fill,
			wireframe: true
		});


		this.shape = new THREE.Mesh(geometry, material);
		this.shape.name = this.name;
		this.shape.position.x = this.position.x;
		this.shape.position.y = this.position.y;
		this.shape.position.z = this.position.z;

		return this.shape;

	}


}

