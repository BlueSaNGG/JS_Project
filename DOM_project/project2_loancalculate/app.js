//listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){  //减慢calculateresults的输出
  //Hide results
  //先隐藏了，算出来再显示
  document.getElementById('results').style.display='none';

  //Show loader
  document.getElementById('loading').style.display='block';

  //延时
  setTimeout(calculateresults,500);
  e.preventDefault();
});

//calculate result
function calculateresults(e){
  //UI Vars
  const amount = document.getElementById('amount');
  const interest=document.getElementById('interest');
  const years=document.getElementById("years");
  const monthlyPayment=document.getElementById("monthly-payment");
  const totalPayment=document.getElementById("total-payment");
  const totalInterest=document.getElementById("total-interest");

  //得到float类型
  const principal=parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100 /12;
  //计算interest
  const calculatedPayments= parseFloat(years.value)*12;

  //Compute monthly payment
  const x = Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){  //检查是否为无穷大，是则说明输入错误
    //给下面结果input赋值
    monthlyPayment.value=monthly.toFixed(2);//设定小数
    totalPayment.value=(monthly*calculatedPayments).toFixed(2);
    totalInterest.value=((monthly*calculatedPayments)-principal).toFixed(2);
    //设置显示
    document.getElementById('results').style.display='block';
  }else{
    showError("Please check your numbers");
  }
  //隐藏gif
  document.getElementById('loading').style.display='none';
  //e.preventDefault();
}

//Show Error
function showError(error){
  //Create a div
  const errorDiv=document.createElement('div');

  //Get elements
  const card=document.querySelector(".card");  //得到card
  const heading = document.querySelector(".heading"); //heding为title

  //Add class
  errorDiv.className="alert alert-danger"; //alert-danger设定样式，alert方便后续clear

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv,heading);  //(要放入的parent，要放入的before)

  //clear error after 3sec
  setTimeout(clearError,3000); //3000ms后执行clearError
}

//Clearerror
function clearError(){
  document.querySelector('.alert').remove();
}