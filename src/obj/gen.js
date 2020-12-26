"use strict";
exports.__esModule = true;
var fs = require("fs");
console.log("HELLO !!!", process.argv);
var vCount = 1;
var Vertex = /** @class */ (function () {
    function Vertex(p0, p1, p2) {
        var _this = this;
        this.mul = function (fac) {
            _this.p0 = _this.p0 * fac;
            _this.p1 = _this.p1 * fac;
            _this.p2 = _this.p2 * fac;
            return _this;
        };
        this.add = function (other) {
            _this.p0 = _this.p0 + other.p0;
            _this.p1 = _this.p1 + other.p1;
            _this.p2 = _this.p2 + other.p2;
            return _this;
        };
        this.clone = function () { return new Vertex(_this.p0, _this.p1, _this.p2); };
        this.toObj = function () { return "v " + _this.p0 + " " + _this.p1 + " " + _this.p2; };
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
    }
    Vertex.ZERO = new Vertex(0, 0, 0);
    return Vertex;
}());
var Tri = /** @class */ (function () {
    function Tri(v0, v1, v2) {
        var _this = this;
        this.v0 = Vertex.ZERO;
        this.v1 = Vertex.ZERO;
        this.v2 = Vertex.ZERO;
        this.normal = function () {
            // TODO: calculate the normal
        };
        this.translate = function (vec) {
            _this.v0 = _this.v0.add(vec);
            _this.v1 = _this.v1.add(vec);
            _this.v2 = _this.v2.add(vec);
            return _this;
        };
        this.scale = function (fac) {
            _this.v0 = _this.v0.mul(fac);
            _this.v1 = _this.v1.mul(fac);
            _this.v2 = _this.v2.mul(fac);
            return _this;
        };
        this.clone = function () { return new Tri(_this.v0.clone(), _this.v1.clone(), _this.v2.clone()); };
        this.toObj = function () {
            return "\n" + _this.v0.toObj() + "\n" + _this.v1.toObj() + "\n" + _this.v2.toObj() + "\nf " + vCount++ + " " + vCount++ + " " + vCount++ + " \n";
        };
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
    }
    return Tri;
}());
var Mesh = /** @class */ (function () {
    function Mesh() {
        var _this = this;
        this.tris = [];
        this.toObj = function () {
            return _this.tris.map(function (t) { return t.toObj(); }).join("\n");
        };
        this.translate = function (vec) {
            _this.tris.forEach(function (t) { return t.translate(vec); });
            return _this;
        };
        this.scale = function (fac) {
            _this.tris.forEach(function (t) { return t.scale(fac); });
            return _this;
        };
        this.clone = function () {
            var m = new Mesh();
            m.tris = _this.tris.map(function (t) { return t.clone(); });
            return m;
        };
    }
    return Mesh;
}());
var Obj = /** @class */ (function () {
    function Obj() {
        var _this = this;
        this.geom = [];
        this.toObj = function () {
            return _this.geom.map(function (m) { return m.toObj(); }).join("\n");
        };
        this.scale = function (fac) {
            _this.geom.forEach(function (m) { return m.scale(fac); });
            return _this;
        };
        this.translate = function (vec) {
            _this.geom.forEach(function (m) { return m.translate(vec); });
            return _this;
        };
        this.clone = function () {
            var o = new Obj();
            o.geom = _this.geom.map(function (m) { return m.clone(); });
            return o;
        };
    }
    return Obj;
}());
var buildCube = function () {
    var m = new Mesh();
    // front face
    m.tris.push(new Tri(new Vertex(-0.5, -0.5, 0.5), new Vertex(0.5, 0.5, 0.5), new Vertex(-0.5, 0.5, 0.5)));
    m.tris.push(new Tri(new Vertex(-0.5, -0.5, 0.5), new Vertex(0.5, -0.5, 0.5), new Vertex(0.5, 0.5, 0.5)));
    // back face
    m.tris.push(new Tri(new Vertex(-0.5, -0.5, -0.5), new Vertex(-0.5, 0.5, -0.5), new Vertex(0.5, 0.5, -0.5)));
    m.tris.push(new Tri(new Vertex(-0.5, -0.5, -0.5), new Vertex(0.5, 0.5, -0.5), new Vertex(0.5, -0.5, -0.5)));
    // right face
    m.tris.push(new Tri(new Vertex(0.5, -0.5, 0.5), new Vertex(0.5, 0.5, -0.5), new Vertex(0.5, 0.5, 0.5)));
    m.tris.push(new Tri(new Vertex(0.5, -0.5, 0.5), new Vertex(0.5, -0.5, -0.5), new Vertex(0.5, 0.5, -0.5)));
    // left face
    m.tris.push(new Tri(new Vertex(-0.5, -0.5, 0.5), new Vertex(-0.5, 0.5, 0.5), new Vertex(-0.5, 0.5, -0.5)));
    m.tris.push(new Tri(new Vertex(-0.5, -0.5, 0.5), new Vertex(-0.5, 0.5, -0.5), new Vertex(-0.5, -0.5, -0.5)));
    // top face
    m.tris.push(new Tri(new Vertex(-0.5, 0.5, 0.5), new Vertex(0.5, 0.5, 0.5), new Vertex(0.5, 0.5, -0.5)));
    m.tris.push(new Tri(new Vertex(-0.5, 0.5, 0.5), new Vertex(0.5, 0.5, -0.5), new Vertex(-0.5, 0.5, -0.5)));
    // top bottom
    m.tris.push(new Tri(new Vertex(-0.5, -0.5, 0.5), new Vertex(0.5, -0.5, -0.5), new Vertex(0.5, -0.5, 0.5)));
    m.tris.push(new Tri(new Vertex(-0.5, -0.5, 0.5), new Vertex(-0.5, -0.5, -0.5), new Vertex(0.5, -0.5, -0.5)));
    return m;
};
var buildSponge = function (master, depth) {
    var obj = new Obj();
    // left-bottom
    obj.geom = obj.geom.concat(master
        .clone()
        .geom.map(function (m) { return m.translate(new Vertex(-depth, -depth, depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(-depth, -depth, 0)); }));
    obj.geom = obj.geom.concat(master
        .clone()
        .geom.map(function (m) { return m.translate(new Vertex(-depth, -depth, -depth)); }));
    // left-top
    obj.geom = obj.geom.concat(master
        .clone()
        .geom.map(function (m) { return m.translate(new Vertex(-depth, depth, depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(-depth, depth, 0)); }));
    obj.geom = obj.geom.concat(master
        .clone()
        .geom.map(function (m) { return m.translate(new Vertex(-depth, depth, -depth)); }));
    // left-fill
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(-depth, 0, -depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(-depth, 0, depth)); }));
    // right-bottom
    obj.geom = obj.geom.concat(master
        .clone()
        .geom.map(function (m) { return m.translate(new Vertex(depth, -depth, depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(depth, -depth, 0)); }));
    obj.geom = obj.geom.concat(master
        .clone()
        .geom.map(function (m) { return m.translate(new Vertex(depth, -depth, -depth)); }));
    // right-top
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(depth, depth, depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(depth, depth, 0)); }));
    obj.geom = obj.geom.concat(master
        .clone()
        .geom.map(function (m) { return m.translate(new Vertex(depth, depth, -depth)); }));
    // right-fill
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(depth, 0, -depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(depth, 0, depth)); }));
    // 4 gap
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(0, -depth, depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(0, depth, depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(0, -depth, -depth)); }));
    obj.geom = obj.geom.concat(master.clone().geom.map(function (m) { return m.translate(new Vertex(0, depth, -depth)); }));
    //obj.translate(translate);
    return obj;
};
//console.log(mesh.toObj());
var cube = new Obj();
cube.geom.push(buildCube());
function builder(obj, depth, iter) {
    if (!iter)
        return obj;
    return builder(buildSponge(obj, depth), depth * 3, iter--);
}
var iter = parseInt(process.argv[2]);
var seed = buildSponge(cube, 1);
for (var x = 1; x <= iter; x++) {
    seed = buildSponge(seed, x * 3);
}
/*
const s0 = buildSponge(cube, 1);
const s1 = buildSponge(s0, 3);
const s2 = buildSponge(s1, 9);
const s3 = buildSponge(s2, 27);
//const s4 = buildSponge(s3, new Vertex(20, 0, 0), 81);
*/
console.log("Writing file ...");
fs.writeFile("./public/obj/cube.obj", seed.toObj(), function (err) {
    if (err)
        throw err;
    console.log("Saved!");
    console.log("Vertex Count: " + vCount);
    console.log("Face Count: " + vCount / 3);
});
