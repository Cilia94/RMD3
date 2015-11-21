'use strict';

import {MathUtil} from '../util/';

import EventEmitter from 'eventemitter2';

export default class Cube extends EventEmitter {

	constructor(position, parameters){

		super();

	// let parameters = {
	// width: 15,
	// height: 15
	// widthSegments: 8,
	// heightSegments: 8,
	// depth: 0,
	// depthSegments: 6,

	// }

		this.position = position;
		//this.name = "testn";
		this.fill = '#FE5853';
		this._onFrame();

		this.parameters = parameters;

	}

	_onFrame(){

	requestAnimationFrame(() => this._onFrame());

	}

	setParameters(parameters){

		this.parameters = parameters;

	}

	setWidth(parameter){

		this.parameters.width = parameter;
		this.render();

	}

	setHeight(parameter){

		this.parameters.height = parameter;
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

		let fill = this;
    console.log(x, y, z, fill);

		let geometry = new THREE.BoxGeometry(this.parameters.width, this.parameters.height, this.parameters.depth, this.parameters.widthSegments, this.parameters.heightSegments, this.parameters.depthSegments);

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

