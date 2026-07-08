// Part 0 & 1

function calculateOrderTotal(items: { price: number; qty: number }[], discount: number): number {
  let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total - discount;
}

// In Part 0, calculateOrderTotal produces NaN because we can't 
//add a number and a string that contains non number characters
//The program crashes when attempting to read `order.shippingAddress.city` 
// because `shippingAddress` is undefined. 
// In production, customers would experience the NaN bug and so they wouldnt actually 
//know the orderTotal and also they will get an error if shippingAddress is undefined

const badOrder = {
  customer: "Layla",
  items: [
    { price: "250 EGP", qty: 2 },         
    { price: 100, qty: 1 },
  ],
};

//console.log(calculateOrderTotal(badOrder.items, "50"));
// Part 1: Uncommenting the line above will cause an error because the function takes 
//the discount parameter as a number not a string and also the price in items should
// have been a number not a string and so passing a string causes an error



// Part 2

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

function canCancelOrder(status: OrderStatus): boolean {
  return status === "pending" || status === "shipped";
}

//canCancelOrder("refunded"); 
//Uncommenting the line above will cause an error because "refunded" is not a valid orderStatus
//this would save several hours of debugging if someone used a 
//non valid status like "refunded" or even a typo like "deliverd"


// Part 3: a)

type WarehouseBin = [aisle: number, shelf: number];

//const binForOrder: WarehouseBin =[4, 12, "extra"];
//Uncommenting the line above will cause an error because type
// WarehouseBin can only have 2 parameters when you gave it 3



// Part 3: b)
interface Product { 
  id: string; 
  name: string; 
  price: number 
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

const productRepo = new Repository<Product>();
productRepo.add({ id: "p1", name: "Laptop", price: 39999 });
productRepo.add({ id: "p2", name: "Mouse", price: 999 });
console.log("Product Found:", productRepo.findById("p1"));

const customerRepo = new Repository<Customer>();
customerRepo.add({ id: "c1", name: "Layla", email: "layla@codemart.com" });
console.log("Customer Found:", customerRepo.findById("c1"));


// One Generic class is better than copy pasting the same function for different items
// also if you try to `.add()` an item missing the`id` property, then you will get a 
//compiler error because all items like products or customers or etc. must have an id



// Part 4

interface ProductWithCost extends Product {
  costPrice: number; // internal, never shown to customers
}

interface OrderItem {
  product: ProductWithCost;
  qty: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: OrderStatus;
  shippedAt?: string;
  readonly createdAt: string;
}

// 1. order object
const myOrder: Order = {
  id: "o-123",
  customer: "Layla",
  items: [
    { product: { id: "p1", name: "Laptop", price: 39999, costPrice: 20000 }, qty: 1 }
  ],
  status: "pending",
  createdAt: new Date().toISOString()
};

// 2. shipOrder function
function shipOrder(order: Order): Order {
  return {
    ...order,
    status: "shipped",
    shippedAt: new Date().toISOString()
  };
}

// 3. why use readonly?
//myOrder.createdAt = new Date().toISOString();
//Uncommenting the line above will cause an error because createdAt is a read-only property
//meaning that after initial assignment, the attribute can't be changed. 


// 4. Recalculate Total
function calculateOrderTotalFromItems(items: OrderItem[], discount: number): number {
  let total = 0;
  for (const item of items) {
    total += item.product.price * item.qty;
  }
  return total - discount;
}
console.log("Order Total:", calculateOrderTotalFromItems(myOrder.items, 50));


// Part 5

type PublicProduct = Omit<ProductWithCost, "costPrice">;
type CreateProductInput = Omit<ProductWithCost, "id">;
type UpdateProductInput = Partial<ProductWithCost>;
type ProductCatalog = Record<string, ProductWithCost>;

function toPublicProduct(product: ProductWithCost): PublicProduct {
  const { costPrice, ...publicProps } = product;
  return publicProps;
}

function createProduct(input: CreateProductInput): ProductWithCost {
  return {
    id: crypto.randomUUID(),
    ...input
  };
}

function updateProduct(product: ProductWithCost, changes: UpdateProductInput): ProductWithCost {
  return { ...product, ...changes };
}

const catalog: ProductCatalog = {
  "p1": { id: "p1", name: "Laptop", price: 39999, costPrice: 20000 },
  "p2": { id: "p2", name: "Mouse", price: 999, costPrice: 600 }
};

console.log("Public View:", toPublicProduct(catalog["p1"]));

//If a teammate added a "discountPercent" field to "ProductWithCost" interface, 
//they would have to remember to update "PublicProduct" and other types manually.
//but because we are using "Omit" utility, we don't need to update the other types manually 
//anymore because we automatically derive the other types from the main type "ProductWithCost"
//so any change to "ProductWithCost" will reflect on the other types



// Part 6


//For small teams, storing data types next to their related functions makes coding faster
//and easier because everything is in the correct place. However, as the team grows larger,
//gathering all types into a single shared file becomes necessary. This centralized approach
//prevents code conflicts, makes finding types much easier, and keeps the code organized.



// Part 7

function getExternalWarehouseData() {
  return { id: "w-99", name: "Desk Lamp", price: 150, costPrice: 60, extra: "ignored" };
}

function receiveFromWarehouse(product: ProductWithCost): void {
  console.log("Received product:", product.name);
}

// 1. Passing object with extra fields
receiveFromWarehouse(getExternalWarehouseData());

// This works because TypeScript uses structural typing. "If it has the shape, it fits." 
// Since the object has all the attributes needed to form a `ProductWithCost`,
// it will ignore the extra fields and not cause an error.


// 2. Passing a fresh object literal
//receiveFromWarehouse({ id: "w-1", name: "Chair", price: 90, costPrice: 40, extra: "oops" });
////Uncommenting the line above will cause an error because TypeScript is stricter with object
// literals because it assumes it was a typo, because why would you create an object of a specific
// type and give it an extra attribute that is not found in that type unless it was a spelling mistake


// Final Boss

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function placeOrder(customer: string, items: OrderItem[]): Result<Order> {
  if (items.length === 0) {
    return { success: false, error: "Order must contain at least one item" };
  }

  const discount = 0;
  const total = calculateOrderTotalFromItems(items, discount);

  if (total <= 0) {
    return { success: false, error: "Order total must be greater than zero" };
  }

  const order: Order = {
    id: crypto.randomUUID(),
    customer,
    items,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  return { success: true, data: order };
}

// test cases
const validItems: OrderItem[] = 
[{ product: { id: "p1", name: "Laptop", price: 39999, costPrice: 20000 }, qty: 1 }];

const emptyOrderResult = placeOrder("Layla", []);
const realOrderResult = placeOrder("Layla", validItems);

function handleOrderResult(result: Result<Order>) {
  if (result.success) {
    console.log("Order placed successfully! ID:", result.data.id);
  } else {
    console.log("Failed to place order:", result.error);
  }
}

handleOrderResult(emptyOrderResult);
handleOrderResult(realOrderResult);
