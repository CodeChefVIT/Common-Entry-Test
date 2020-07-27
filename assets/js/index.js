function Login() {
    console.log("login called")
    var data = {
        username: document.getElementById('email').value,
        password: document.getElementById('password').value
    }

    var xh = new XMLHttpRequest();
    xh.open("POST", "https://cetproject.herokuapp.com/auth/login/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload = function () {
        console.log(this.status)
        if (this.status == 200) {
            console.log(this.status)
            alert("Login Success")
            var data = JSON.parse(this.responseText)
            localStorage.setItem("JWT_Token", data.token)
            // window.location.replace('index.html')
        }
        else {
            console.log(this.status)
            alert('Invalid login credentials')
        }
    }
}

function SignUp() {
    console.log("signup called")
    var data = {
        username: document.getElementById('email1').value,
        first_name: document.getElementById('fname').value,
        last_name: document.getElementById('lname').value,
        password: document.getElementById('password1').value,
        branch: document.getElementById('branch').value,
        registration_number: document.getElementById('rgno').value
    }
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://cetproject.herokuapp.com/auth/signup/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload = function () {
        console.log(this.status)
        if (this.status == 200) {
            console.log(this.status)
          
            alert('Registered successfully! Login to continue')
//   window.location.replace('../../index.html')
        }
        else {
            console.log(this.status)
            alert('Failed! Try again')
        }
    }
}