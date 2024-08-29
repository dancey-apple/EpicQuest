import React from "react";
import NavBar from "../NavBar";

export default function NewUser() {

    async function createUser(event){
        event.preventDefault();
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log({ firstName, lastName, username, email, password });

        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, username, email, password }),
        });

            if (res.ok) {
                const result = await res.json();
                alert("NEW ACHIEVEMENT! You have just signed up for Epic Quest. Welcome to the guild! (Don't read the fine print. You'll just be dissapointed.)");
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("username").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
            } else {
                const error = await res.json();
                alert(`Failed to create user. Error: ${error.message}`);
        }
    }

    return(
        <>
            <NavBar />
            <h1 className='text-center font-bold text-4xl m-4 text-secondary hover:text-glow hover:drop-shadow-gl'>Sign up for the Guild!</h1>
            <div className='flex flex-col justify-center px-96'>
                <form onSubmit={createUser} className='flex flex-col justify-around border-2 border-secondary rounded-xl h-96'>
                    <div className='flex flex-row justify-center mx-4 text-lg text-secondary' required>
                        <label htmlFor="firstName">FirstName</label>
                        <input className='bg-secondary text-primary flex-grow font-bold ml-4' type="text" id="firstName" name="firstName" />
                    </div>
                    <div className='flex flex-row justify-center mx-4 text-lg text-secondary' required>
                        <label htmlFor="lastName">LastName</label>
                        <input className='bg-secondary text-primary flex-grow font-bold ml-4' type="text" id="lastName" name="lastName" />
                    </div>
                    <div className='flex flex-row justify-center mx-4 text-lg text-secondary' required>
                        <label htmlFor="username">Username</label>
                        <input className='bg-secondary text-primary flex-grow font-bold ml-4' type="text" id="username" name="username" />
                    </div>
                    <div className='flex flex-row justify-center mx-4 text-lg text-secondary' required>
                        <label htmlFor="email">Email</label>
                        <input type='email' className='bg-secondary text-primary flex-grow font-bold ml-4' id="email" name="email" />
                    </div>
                    <div className='flex flex-row justify-center mx-4 text-lg text-secondary' required>
                        <label htmlFor="password">Password</label>
                        <input type='password' className='bg-secondary text-primary flex-grow font-bold ml-4' id="password" name="password" />
                    </div>
                    <div className='flex flex-row justify-center'>
                        <button type="submit" className='bg-secondary text-lg font-bold text-primary rounded-xl px-10 py-2 hover:py-3 hover:px-11 hover:bg-glow hover:drop-shadow-gl hover:text-purple-950'>Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}