const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");
/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  //save to database
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  //REDIS logic
  const current = await getAsync("added_todos");
  const currentNumber = current ? Number(current) : 0;
  await setAsync("added_todos", currentNumber + 1);
  res.send(todo);
});
//12.10
router.get("/statistics", async (req, res) => {
  const added = await getAsync("added_todos");

  res.json({
    added_todos: added ? Number(added) : 0,
  });
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});
//12.7
/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.json(req.todo);
});
/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  Object.assign(req.todo, req.body);
  const updated = await req.todo.save();
  res.json(updated);
});

// // GET one todo
// router.get("/:id", async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.id);

//     if (!todo) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json(todo);
//   } catch (error) {
//     res.status(400).json({ error: "Malformatted id" });
//   }
// });
// // UPDATE one todo
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // Return the updated document
//       runValidators: true, // Mongoose uses schema validation when update
//       context: "query", // Needed for some validators to work properly during update
//     });

//     if (!updatedTodo) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json(updatedTodo);
//   } catch (error) {
//     res.status(400).json({ error: "Malformatted id" });
//   }
// });

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
