function x() {
  import("./module1.js");
  import("./module2.js").then((m) => console.log(m));
}

x();
