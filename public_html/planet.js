// Global variables
var DIAMETER_SCALE = 50;
var WIREFRAME = false;
var MESH_SCALE = 100;
var DISTANCE_SCALE = 2000;

// Constructor for the planet object
function planet(planetName, planetVector, planetDiameter, planetColour)
{
    // Store member variables
    this.name = planetName;
    this.position = new THREE.Vector3(planetVector[0] * DISTANCE_SCALE, planetVector[1] * DISTANCE_SCALE, planetVector[2] * DISTANCE_SCALE);
    this.diameter = planetDiameter/1000;
    this.colour = planetColour;

    // Create the geometry for this planet
    this.geometry = new THREE.SphereGeometry(toAstronomicalUnits(planetDiameter) * 0.5 * DIAMETER_SCALE, 32, 32);


    var heightMap;

    // Load the texture (Maybe this should only be done once.....?)
    switch(planetType) {
    case "earth":
        heightMap = new THREE.TextureLoader().load("res/planetEarth.jpg");
        break;
    case "gas":
        heightMap = new THREE.TextureLoader().load("res/planetGas.jpg");
        break;
    case "solid":
        heightMap = new THREE.TextureLoader().load("res/planetSolid.jpg");
        break;
    default:
        //Default to solid.
        heightMap = new THREE.TextureLoader().load("res/planetSolid.jpg");
}


    // Load the heightmap (Maybe this should only be done once.....?)
    var heightMap = new THREE.TextureLoader().load("res/planetBump.jpg");
    heightMap.anisotropy = 4;
    heightMap.repeat.set( 0.998, 0.998 );
    heightMap.offset.set( 0.001, 0.001 );
    heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;
    heightMap.format = THREE.RGBFormat;

    // Create the material for this planet
    var args = {};
    if (WIREFRAME == true) args['wireframe'] = true;
    this.material = new THREE.MeshLambertMaterial(args);
    this.material.color = new THREE.Color(this.colour);
    this.material.map = heightMap;

    // Create the mesh for thus planet
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(MESH_SCALE, MESH_SCALE, MESH_SCALE);

    // Set the position of this planet
    this.setPosition = function(x, y, z) {
      this.position = new THREE.Vector3(x * GLOBAL_SCALE, y * GLOBAL_SCALE, z * GLOBAL_SCALE);
      this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    };

    // Set the position of this
    this.setPosition = function(x, y, z) {
      this.position = new THREE.Vector3(x, y, z);
      this.mesh.position.set(x,y,z);
    }

    // Returns the mesh for this planet
    this.getMesh = function() {
      return this.mesh;
    }
}

// Converts input kilometers to astronomical units
function toAstronomicalUnits(km) {
  return km * Math.pow(6.68459,-9)
}
