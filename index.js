console.log("Running...");
async function run() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Finish!");
      resolve();
    }, 1000 * 30);
  });
}
run();
