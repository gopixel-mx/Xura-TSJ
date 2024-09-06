"use client"
import Link from "next/link";
import "../../app/globals.css";

interface User {
    isAuthenticated: boolean;
    rol: number,
}

export default function Navbar({ isAuthenticated, rol }: User) {
    const backgroundColor = 'rgb(50, 22, 155)';

    return (
        <nav
            className="w-full p-4"
            style={{ backgroundColor }}
        >
            <div className="flex justify-between items-center text-white">
                <h1>Xura</h1>
                {
                    isAuthenticated && rol === 1 ? (
                        <div className="flex space-x-4">
                            <Link href="/">Home</Link>
                            <Link href="/">Perfil</Link>
                        </div>
                    ) :
                        (
                            <div className="flex space-x-4">
                                <Link href="/">Home</Link>
                                <Link href="/">Xd</Link>
                            </div>
                        )
                }
            </div>
        </nav>
    );
};
