import type { loginDto } from "./dto/login.dto.js";
import type { signupDto } from "./dto/signup.dto.js";
import type { signupResponse } from "./dto/signup.response.js";

//api just hanlde its job, state let other component handle
// done 

//synonymous with GET method, with return value of json web token
export async function loginApi({username, password} : loginDto) {
    const userInfo = {username, password};
    const loginResponse = await fetch("http://localhost:3000/auth/login", {
        method:"GET",
        headers: {
            "Content-Type" : "applicaton/json",
        },
        body: JSON.stringify(userInfo),
    })

    const jwtResponse = await loginResponse.text();
    console.log(jwtResponse);
    return jwtResponse;
}

//using for POST method
export async function signupApi({fullname, email, username, password} : signupDto) : Promise<signupResponse>{
    const newUser = {fullname, email, username, password};
    console.log("Information of the new user:", newUser);

    const signupResponse = await fetch("http://localhost:3000/auth/create-account", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });

    console.log(signupResponse);
    console.log(signupResponse.json());
    
    return signupResponse.json();
}