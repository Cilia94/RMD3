'use strict';

const randomBool = () => {
  return Boolean(Math.round(Math.random()));
};

// export const randomBetween = (start, end) =>
//   start + Math.round(Math.random()*(end-start));

export const randomPoint = bounds => {

  bounds = bounds || {};
  bounds.border = bounds.border || 0;



  return {
    x: randomBetween(bounds.border, (bounds.width-bounds.border)/2, true, true),
    y: randomBetween(bounds.border, (bounds.height-bounds.border)/2, true, true),
    z: randomBetween(bounds.border, (bounds.depth-bounds.border)/2, true, true)
  };

  // shape.position.x = randomBetween(0, range, true, true);
  //   shape.position.y = randomBetween(0, range, true, true);
  //   shape.position.z = randomBetween(0, range, true, true);

};

const randomBetween = (min, max, round=true, signed=false) => {
  let rand = min + Math.random() * (max-min);
  if(round) rand = Math.round(rand);
  if(signed && randomBool()){
    return rand - (rand*2);
  }
  return rand;
};

 const randomBetweenM = (start, end) =>
  start + Math.round(Math.random()*(end-start));


export const distanceBetweenPoints = (pos1, pos2) => {

  var xs = pos2.x - pos1.x;
  xs = xs * xs;

  var ys = pos2.y - pos1.y;
  ys = ys * ys;

  return Math.sqrt(xs + ys);

};

export default {
  randomBetween,
  distanceBetweenPoints,
  randomPoint,
  randomBetweenM
};
