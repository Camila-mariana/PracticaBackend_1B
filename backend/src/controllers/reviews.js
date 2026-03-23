//array de metodos
const reviewsController = {};
//import el schema de la coleccion q vamos a utilizar
import reviewsModels from "../models/reviews.js";
//select
reviewsController.getReviews = async (req, res) => {
  const employees = await reviewsModels.find().populate();
  res.json(employees);
};
//insert
reviewsController.insertReviews = async (req, res) => {
  //#1 Solicito los datos a guardar
  const { idEmployee, idProducts, rating, comment } =
    req.body;
  //#2 Lleno una instacia de mi Schema
  const newReviews = new reviewsModels({
    idEmployee,
    idProducts,
    rating,
    comment,
  });
  //#3 Guardo en la base de datos
  await newReviews.save();
  res.json({ message: "Review saved" });
};
//delete
reviewsController.deleteReviews = async (req, res) => {
  await reviewsModels.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};
//actualizar
reviewsController.updateReviews = async (req, res) => {
  const { idEmployee, idProducts, rating, comment } = req.body;
  await reviewsModels.findByIdAndUpdate(
    req.params.id,
    {
      idEmployee,
      idProducts,
      rating,
      comment,
    },
    { new: true },
  );
  res.json({ message: "Review updated" });
};

export default reviewsController;
