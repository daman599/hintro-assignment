"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "./ui/Loader";
import { useStore } from "@/store";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const authState = useStore((state) => state.authState);

    useEffect(() => {
        const isLoggedin = localStorage.getItem("isLoggedIn");

        if (!isLoggedin) {
            router.replace("/login");
        } else {
            setLoading(false);
        }
    }, [authState]);

    if (loading) return <Loader />

    return (
        <>{children}</>
    );
}