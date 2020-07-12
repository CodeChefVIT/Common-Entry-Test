
function Validateemail() {
    console.log(document.getElementById('email').value)
    if(document.getElementById('email').value.includes('vitstudent.ac.in')){
        return true;
    }
    alert("Please enter a valid email address.");
    return false;
}

function ValidatePass() {
    if (document.getElementById("password").value.length > 5)
        return true;
    else
        alert("Wrong password");
    return false;

}
function ValidateRgno() {
    if (document.getElementById("rgno").value.length == 9)
        return true;
    else
        alert("Wrong Registration Number");
    return false;

}

function ValidatePassSignup() {
    if (document.getElementById("password").value.length > 5)
        return true;
    else
        alert("Enter minimum 6 Characters for password");
    return false;
}

function validateForm(){
     var fname = document.getElementById('fname');
     var lname = document.getElementById('lname');
     var email = document.getElementById('email');
     var password = document.getElementById('password');
     var branch= document.getElementById('branch');
     var rgno= document.getElementById('rgno');
  
     if(document.getElementById('fname') &&
        document.getElementById('lname') && document.getElementById('email') && document.getElementById('password') && document.getElementById('branch')&&
        document.getElementById('rgno')  && ValidatePassSignup() && ValidateRgno() && Validateemail())
     {
         SignUp()
     }
     else{
         alert('Please fill complete details!')
     }
}
function validateLogin(){
     var email = document.getElementById('email');
     var password = document.getElementById('password');
  
     if(document.getElementById('email') && document.getElementById('password') &&  Validateemail() && ValidatePass() )
     {
         Login()
     }
     else{
         alert('Please fill complete details!')
     }
}


function Login() {
    document.getElementById("signin").disabled = true
    var data = {
                    username: document.getElementById("email").value,
                password:document.getElementById("password").value
                }
            
              var xh = new XMLHttpRequest();
    xh.open("POST", "https://cetproject.herokuapp.com/auth/login", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        if(this.status==200)
        {
            alert("Login Success")
            document.getElementById("signin").disabled = false
            var data = JSON.parse(this.responseText)
            localStorage.setItem("JWT_Token", "JWT " + data.token)
            window.location.replace('index.html')
        }
        else{
            alert('Invalid login credentials')
            document.getElementById("password").value = ''
            document.getElementById("signin").disabled = false
        }
}
}



function SignUp() {
            document.getElementById("signup").disabled = true
           var data={
                    username: document.getElementById("email").value,
                    first_name: document.getElementById("fname").value,
                    last_name: document.getElementById("lname").value,
                    password: document.getElementById("password").value,
                     branch: document.getElementById("branch").value, registration_number:
                    document.getElementById("rgno").value
                }
                   var xh = new XMLHttpRequest();
    xh.open("POST", "https://cetproject.herokuapp.com/auth/signup", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        if(this.status==201)
        {
            alert('Registered successfully! Login to continue')
            window.location.replace('index.html')
        }
        else{
            alert('Failed! Try again')
        }
}
}