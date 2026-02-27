import { jwtToken } from "../../feature/auth/api/auth.api.js";

const jwt = localStorage.getItem(jwtToken);

export async function getUserAPI() {
    try {
        const response = await fetch("http://localhost:3000/admin/account-management/get-users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            }
        })

        if (!response.ok) {
            throw new Error(`Response is not ok with StatusCode:${response.status} and StatusText: ${response.status}`);
        }

        //if oke, then get the data
        const users = response.json();
        console.log(users);
        return users;
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error("Unknown error", err);
        }
    }
}

export async function createUserAPI() {
    try {
        const response = await fetch("http://localhost:3000/admin/account-management/create-user");

        //check whether the http request is ok or no
        if (!response.ok) {
            throw new Error(`Error in send HTTP request, Status:${response.status}, StatusText: ${response.statusText}`);
        }

        //if oke, get the data by using json()
        const messageResponse = response.json();
        console.log(messageResponse);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error("Unknown error", err);
        }
    }
}

export async function deleteUserAPI() {
    try {
        const response = await fetch("http://localhost:3000/admin/account-management/delete-user");

        if (!response.ok) {

            throw new Error(`Error in send HTTP request, Status:${response.status}, StatusText: ${response.statusText}`);

        }

        const messageResponse = response.json();
        console.log(messageResponse);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error("Unknown error", err);
        }
    }
}

export async function updateUserAPI() {
    try {
        const response = await fetch("http://localhost:3000/admin/account-management/update-user");

        if (!response.ok) {
            throw new Error(`Error in send HTTP request, Status:${response.status}, StatusText: ${response.statusText}`);
        }
        const messageResponse = response.json();
        console.log(messageResponse);
    } catch(err) {
        if(err instanceof Error) {
            console.log(err.message);
        }

        else {
            console.log("Unknow error", err);
        }
    }
}

