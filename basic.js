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

// --- Exercise: Counting up from 10 to 20 ---
  // write your codes here

  for(let i = 10; i < 21; i += 1){
    console.log(i);
  }

// --- Exercise: Counting down from 20 to 0 ---
  // write your codes here

  for(let i = 20; i > 0; i -= 1){
    console.log(i);
  }

// --- Exercise: Multiple of 3 below 45 ---
  // write your codes here

  for(let i = 0; i < 46; i++){
    if(i % 3 == 0){
      console.log(i);
    }
  }

// --- Exercise: Sum of first 10 even numbers ---
  // write your codes here

  let evenSum = 0;
  let yEven = 90;
  for (let i = 2; i <= 20; i+=2){
    evenSum = evenSum + i;
  };
  console.log("The sum of the first 10 even numbers is " + evenSum);
  text("The sum of the first 10 even numbers is " + evenSum, 20, 60);

// --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here

  let oddSum = 0;
  let num = 19;
  let xOdd = 20;
  let yOdd = yEven + 100;
  while (num >= 1){
    console.log(num);
    xOdd += 50;
    oddSum = oddSum + num;
    num = num - 2;
  }
  console.log(oddSum);
  text("The sum of the first 10 odd numbers is " + oddSum, 20, 90);

// --- Exercise: Age category classification ---
  // write your codes here
  
  let age = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  let category = "";
  if (age <= 9){
    category = "lower primary";
  }else if (age <= 12){
    category = "upper primary";
  }else if (age <= 16){
    category = "secondary";
  }else if (age <= 60){
    category = "a place for very old people and having a j*b";
  };
  text("You are " + age + " years old in " +  category, 20, 120);

// --- Exercise: Array operations (groceries) ---
  // write your codes here

  let groceries = ["Apple", "Bread", "Milk"];
  groceries.push("Orange");
  groceries.push("Butter");
  groceries.shift();
  groceries.splice(1, 1, "Kaya");
  console.log(groceries);
}