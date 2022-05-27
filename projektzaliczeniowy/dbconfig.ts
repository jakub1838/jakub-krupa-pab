import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://jakub1838:12345@cluster0.3kzmx.mongodb.net/?retryWrites=true&w=majority` );

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  }
});
export const DishModel = mongoose.model("Dish", DishSchema);

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
export const EmployeeModel =  mongoose.model("Employee", EmployeeSchema);

const OrderSchema = new mongoose.Schema({
  employee: {
    type: String,
    required: true,
  },
  dishes: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  }
});
export const OrderModel = mongoose.model("Order", OrderSchema);

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitOfMeasure: {
    type: String,
    required: true,
  },
});
export const ProductModel = mongoose.model("Product", ProductSchema);

const ReservationsSchema = new mongoose.Schema({
  table: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
  },
  client: {
    type: String,
    required: true,
  }
});
export const ReservationsModel = mongoose.model("Reservations", ReservationsSchema);

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  nip: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  www: {
    type: String,
    required: true,
  },
});
export const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);

const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});
export const TableModel = mongoose.model("Table", TableSchema);

