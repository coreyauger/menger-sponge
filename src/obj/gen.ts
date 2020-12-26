import * as fs from "fs";

let vCount = 1;

class Vertex {
  p0: number;
  p1: number;
  p2: number;

  constructor(p0: number, p1: number, p2: number) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
  }
  static ZERO = new Vertex(0, 0, 0);

  mul = (fac: number) => {
    this.p0 = this.p0 * fac;
    this.p1 = this.p1 * fac;
    this.p2 = this.p2 * fac;
    return this;
  };

  add = (other: Vertex) => {
    this.p0 = this.p0 + other.p0;
    this.p1 = this.p1 + other.p1;
    this.p2 = this.p2 + other.p2;
    return this;
  };
  clone = () => new Vertex(this.p0, this.p1, this.p2);

  toObj = () => `v ${this.p0} ${this.p1} ${this.p2}`;
}

class Tri {
  v0: Vertex = Vertex.ZERO;
  v1: Vertex = Vertex.ZERO;
  v2: Vertex = Vertex.ZERO;

  constructor(v0: Vertex, v1: Vertex, v2: Vertex) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
  }

  normal = () => {
    // TODO: calculate the normal
  };

  translate = (vec: Vertex) => {
    this.v0 = this.v0.add(vec);
    this.v1 = this.v1.add(vec);
    this.v2 = this.v2.add(vec);
    return this;
  };

  scale = (fac: number) => {
    this.v0 = this.v0.mul(fac);
    this.v1 = this.v1.mul(fac);
    this.v2 = this.v2.mul(fac);
    return this;
  };
  clone = () => new Tri(this.v0.clone(), this.v1.clone(), this.v2.clone());

  toObj = () => {
    return `
${this.v0.toObj()}
${this.v1.toObj()}
${this.v2.toObj()}
f ${vCount++} ${vCount++} ${vCount++} 
`;
  };
}

class Mesh {
  tris: Tri[] = [];

  toObj = () => {
    return this.tris.map((t) => t.toObj()).join("\n");
  };

  translate = (vec: Vertex) => {
    this.tris.forEach((t) => t.translate(vec));
    return this;
  };
  scale = (fac: number) => {
    this.tris.forEach((t) => t.scale(fac));
    return this;
  };
  clone = () => {
    const m = new Mesh();
    m.tris = this.tris.map((t) => t.clone());
    return m;
  };
}

class Obj {
  geom: Mesh[] = [];

  toObj = () => {
    return this.geom.map((m) => m.toObj()).join("\n");
  };
  scale = (fac: number) => {
    this.geom.forEach((m) => m.scale(fac));
    return this;
  };
  translate = (vec: Vertex) => {
    this.geom.forEach((m) => m.translate(vec));
    return this;
  };
  clone = () => {
    const o = new Obj();
    o.geom = this.geom.map((m) => m.clone());
    return o;
  };
}

const buildCube = (): Mesh => {
  const m = new Mesh();
  // front face
  m.tris.push(
    new Tri(
      new Vertex(-0.5, -0.5, 0.5),
      new Vertex(0.5, 0.5, 0.5),
      new Vertex(-0.5, 0.5, 0.5)
    )
  );
  m.tris.push(
    new Tri(
      new Vertex(-0.5, -0.5, 0.5),
      new Vertex(0.5, -0.5, 0.5),
      new Vertex(0.5, 0.5, 0.5)
    )
  );
  // back face
  m.tris.push(
    new Tri(
      new Vertex(-0.5, -0.5, -0.5),
      new Vertex(-0.5, 0.5, -0.5),
      new Vertex(0.5, 0.5, -0.5)
    )
  );
  m.tris.push(
    new Tri(
      new Vertex(-0.5, -0.5, -0.5),
      new Vertex(0.5, 0.5, -0.5),
      new Vertex(0.5, -0.5, -0.5)
    )
  );
  // right face
  m.tris.push(
    new Tri(
      new Vertex(0.5, -0.5, 0.5),
      new Vertex(0.5, 0.5, -0.5),
      new Vertex(0.5, 0.5, 0.5)
    )
  );
  m.tris.push(
    new Tri(
      new Vertex(0.5, -0.5, 0.5),
      new Vertex(0.5, -0.5, -0.5),
      new Vertex(0.5, 0.5, -0.5)
    )
  );
  // left face
  m.tris.push(
    new Tri(
      new Vertex(-0.5, -0.5, 0.5),
      new Vertex(-0.5, 0.5, 0.5),
      new Vertex(-0.5, 0.5, -0.5)
    )
  );
  m.tris.push(
    new Tri(
      new Vertex(-0.5, -0.5, 0.5),
      new Vertex(-0.5, 0.5, -0.5),
      new Vertex(-0.5, -0.5, -0.5)
    )
  );
  // top face
  m.tris.push(
    new Tri(
      new Vertex(-0.5, 0.5, 0.5),
      new Vertex(0.5, 0.5, 0.5),
      new Vertex(0.5, 0.5, -0.5)
    )
  );
  m.tris.push(
    new Tri(
      new Vertex(-0.5, 0.5, 0.5),
      new Vertex(0.5, 0.5, -0.5),
      new Vertex(-0.5, 0.5, -0.5)
    )
  );
  // top bottom
  m.tris.push(
    new Tri(
      new Vertex(-0.5, -0.5, 0.5),
      new Vertex(0.5, -0.5, -0.5),
      new Vertex(0.5, -0.5, 0.5)
    )
  );
  m.tris.push(
    new Tri(
      new Vertex(-0.5, -0.5, 0.5),
      new Vertex(-0.5, -0.5, -0.5),
      new Vertex(0.5, -0.5, -0.5)
    )
  );
  return m;
};

const buildSponge = (master: Obj, depth: number): Obj => {
  const obj = new Obj();
  // left-bottom
  obj.geom = obj.geom.concat(
    master
      .clone()
      .geom.map((m) => m.translate(new Vertex(-depth, -depth, depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(-depth, -depth, 0)))
  );
  obj.geom = obj.geom.concat(
    master
      .clone()
      .geom.map((m) => m.translate(new Vertex(-depth, -depth, -depth)))
  );
  // left-top
  obj.geom = obj.geom.concat(
    master
      .clone()
      .geom.map((m) => m.translate(new Vertex(-depth, depth, depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(-depth, depth, 0)))
  );
  obj.geom = obj.geom.concat(
    master
      .clone()
      .geom.map((m) => m.translate(new Vertex(-depth, depth, -depth)))
  );
  // left-fill
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(-depth, 0, -depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(-depth, 0, depth)))
  );

  // right-bottom
  obj.geom = obj.geom.concat(
    master
      .clone()
      .geom.map((m) => m.translate(new Vertex(depth, -depth, depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(depth, -depth, 0)))
  );
  obj.geom = obj.geom.concat(
    master
      .clone()
      .geom.map((m) => m.translate(new Vertex(depth, -depth, -depth)))
  );
  // right-top
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(depth, depth, depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(depth, depth, 0)))
  );
  obj.geom = obj.geom.concat(
    master
      .clone()
      .geom.map((m) => m.translate(new Vertex(depth, depth, -depth)))
  );
  // right-fill
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(depth, 0, -depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(depth, 0, depth)))
  );
  // 4 gap
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(0, -depth, depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(0, depth, depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(0, -depth, -depth)))
  );
  obj.geom = obj.geom.concat(
    master.clone().geom.map((m) => m.translate(new Vertex(0, depth, -depth)))
  );
  return obj;
};

const cube = new Obj();
cube.geom.push(buildCube());

const iter = parseInt(process.argv[2]);
let seed = buildSponge(cube, 1);
for (let x = 1; x <= iter; x++) {
  seed = buildSponge(seed, x * 3);
}

console.log("Writing file ...");

fs.writeFile("./public/obj/cube.obj", seed.toObj(), function (err) {
  if (err) throw err;
  console.log("Saved!");
  console.log(`Vertex Count: ${vCount}`);
  console.log(`Face Count: ${vCount / 3}`);
});
