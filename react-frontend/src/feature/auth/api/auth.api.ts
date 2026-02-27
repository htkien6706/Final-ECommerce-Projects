import type { loginDto } from "./dto/login.dto.js";
import type { signupDto } from "./dto/signup.dto.js";
import type { signupResponse } from "./dto/signup.response.js";

export const jwtToken = 'jwtToken';

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
    console.log("This is the user with the jwt:", jwtResponse);
    localStorage.setItem(jwtToken, jwtResponse);
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

    //must using clone because we can just use json() once when fetching the data because json() is readablestream, only read it once, when we need it, just using clone() to get identical response to check
    const clone = await signupResponse.clone().json();
    console.log("The message received is:", clone.message);
    return signupResponse.json();
}

