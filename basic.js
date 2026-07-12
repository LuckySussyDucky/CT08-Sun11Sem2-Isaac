function setup() {
  new Canvas(800, 600);
  background(250);
  displayMode('centered');
  textSize(16);
  fill(0);


  // write your codes here

  // let a = 5;
  // let b = 10;
  // let sum = a + b;
  // let product = a * b;
  // console.log("The sum is " + sum);
  // console.log("The product is" + product);
  // text("The sum is " + sum, 20, 30)

  // --- Exercise: Area of Triangle ---
  // write your codes here

  let base = 10; //declare variable base
  let height = 5; //declare variable height
  let area = base * height * 0.5;
  console.log("The area is " + area);
  text("The area is " + area, 20, 30);

  // --- Exercise: Sum of first 10 even numbers ---
  // write your codes here

  let evenSum = 0;
  let yEven = 90;
  for (let i = 2; i <= 20; i+=2){
    evenSum = evenSum + i;
    text(i, 20 + i * 30, yEven);
  };
  console.log("The sum of the first 10 even numbers is " + evenSum);
  text("The sum of the first 10 even numbers is " + evenSum, 20, 60);

  // --- Exercise: Age category classification ---
  // write your codes here

  // let score = 100
  // if (score > 90){
  //   console.log("Excellent!");
  // }else if ( score > 70){
  //   console.log("Good job!");
  // }else(
  //   console.log("Keep Improving!");
  // )
  
  let age = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
  let category = "";
  if (age <= 9){
    category = "lower primary";
  }else if (age <= 12){
    category = "upper primary";
  }else if (age <= 16){
    category = "secondary";
  }else{
    category = "a place for very old people";
  };
  text("You are " + age + " years old in " +  category, 20, 90);

  // --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here

  // let count = 0
  // while (count < 5){
  //   console.log(count);
  //   count = count + 1
  // }

  let oddSum = 0;
  let num = 19;
  let xOdd = 20;
  let yOdd = yEven + 100;
  while (num >= 1){
    console.log(num);
    text(num, xOdd, yOdd);
    xOdd += 50;
    oddSum = oddSum + num;
    num = num - 2;
  }
  console.log(oddSum);
  text("Total sum of odd numbers is " + oddSum, 20, 240);

  // --- Exercise: Array operations (groceries) ---
  // write your codes here

  let groceries = ["Apple", "Bread", "Milk"];
  groceries.push("Orange");
  groceries.push("Butter");
  groceries.shift();
  groceries.splice(1, 1, "Kaya")
  console.log(groceries);
  for (let i = 0; i < groceries.length; i++){
    text(groceries[i], 40 + i * 100, yOdd + 100);
  }

  for(let i = 0; i < 21; i += 2){
    console.log(i);
  }

  for(let i = 0; i < 47; i++){
    if(i % 4 == 0){
      console.log(i);
    }

  age = 10;
  if (age <= 9){
    console.log("lower primary");
    text("lower primary", 20, 360);
  }else if (age <= 12){
    console.log("upper primary");
    text("upper primary", 20, 360); 
  }else if (age <= 16){
    console.log("secondary");
    text("secondary", 20, 360);
  }else{
    console.log("a place for very old people");
    text("a place for very old people", 20, 360);
  }

  // while(num <= 19){
  //   console.log(num);
  //   text(num, 20, 390);
  //   num = num - 2;
  // }

  groceries = ["Apple", "Bread", "Milk"];
  groceries.push("Orange");
  groceries.push("Butter");
  groceries.shift();
  groceries.splice(1, 1, "Kaya");
  console.log(groceries);
  for(let i = 0; i < groceries.length; i++){
    text(groceries[i],20 + i * 75, 420)
  }
}
}