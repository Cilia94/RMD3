'use strict';

import Effects from '../../data/Effects';
import MathUtil from './MathUtil';

export const randomEffect = () => {

  let effects = [];

  for(let key in Effects){
    effects.push(Effects[key]);
  }

  return effects[MathUtil.randomBetween(0, effects.length-1)];

};

export const getPanning = (bounds, x) => {

  let range = bounds.width - (bounds.border * 2);
  let halfRange = range/2;

  x = x - bounds.border;

  let panning = x/range;

  if(panning < 0.5){
    panning = -(1- (x/halfRange));
  }else if(panning === 0.5){
    panning = 0;
  }else{
    panning = (x-halfRange)/halfRange;
  }

  return panning;

};

export const getVolume = (bounds, y) => {

  let range = bounds.height - (bounds.border * 2);
  y = y - bounds.border;

  return 1- (y/range);

};

export default {
  randomEffect,
  getPanning,
  getVolume
};
